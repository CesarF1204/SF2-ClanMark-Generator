import { writeFile, mkdir, access } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const assetsRoot = join(root, 'public', 'assets')

// Minimal 64x64 PNG placeholders (pre-generated solid colors with transparency)
const PLACEHOLDERS = {
  backgrounds: [
    { name: 'bg_red.png', color: [180, 40, 40] },
    { name: 'bg_blue.png', color: [40, 80, 180] },
    { name: 'bg_black.png', color: [30, 30, 35] },
    { name: 'bg_green.png', color: [40, 120, 60] },
  ],
  middle: [
    { name: 'pattern_cross.png', color: [220, 180, 50] },
    { name: 'pattern_star.png', color: [200, 200, 210] },
    { name: 'pattern_skull.png', color: [180, 180, 190] },
    { name: 'pattern_wings.png', color: [160, 170, 200] },
  ],
  foreground: [
    { name: 'overlay_badge.png', color: [245, 158, 11] },
    { name: 'overlay_frame.png', color: [220, 220, 230] },
    { name: 'overlay_banner.png', color: [200, 160, 80] },
    { name: 'overlay_emblem.png', color: [240, 240, 250] },
  ],
}

async function createSimplePngAsync(r, g, b, size = 64) {
  const { deflateSync } = await import('node:zlib')
  const width = size
  const height = size

  const pixels = Buffer.alloc(width * height * 4)
  const cx = width / 2
  const cy = height / 2
  const radius = width * 0.38

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const dist = Math.hypot(x - cx, y - cy)
      if (dist <= radius) {
        const edge = Math.max(0, 1 - (dist - radius + 3) / 3)
        pixels[idx] = r
        pixels[idx + 1] = g
        pixels[idx + 2] = b
        pixels[idx + 3] = Math.round(255 * edge)
      }
    }
  }

  return buildPng(width, height, pixels, deflateSync)
}

function crc32(buf) {
  let c = 0xffffffff
  const table = crc32.table ?? (crc32.table = makeCrcTable())
  for (let i = 0; i < buf.length; i++) {
    c = table[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  }
  return (c ^ 0xffffffff) >>> 0
}

function makeCrcTable() {
  const table = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    table[n] = c
  }
  return table
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type)
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const crcBuf = Buffer.alloc(4)
  const crcVal = crc32(Buffer.concat([typeBuf, data]))
  crcBuf.writeUInt32BE(crcVal)
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function buildPng(width, height, rgba, deflateSync) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 6 // RGBA
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  const raw = Buffer.alloc(height * (1 + width * 4))
  for (let y = 0; y < height; y++) {
    const rowStart = y * (1 + width * 4)
    raw[rowStart] = 0 // filter none
    rgba.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4)
  }

  const compressed = deflateSync(raw)
  return Buffer.concat([
    signature,
    chunk('IHDR', ihdr),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

async function fileExists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function main() {
  for (const [folder, items] of Object.entries(PLACEHOLDERS)) {
    const dir = join(assetsRoot, folder)
    await mkdir(dir, { recursive: true })

    for (const { name, color } of items) {
      const filePath = join(dir, name)
      if (await fileExists(filePath)) continue
      const png = await createSimplePngAsync(...color)
      await writeFile(filePath, png)
      console.log(`Created ${filePath}`)
    }
  }
}

main().catch(console.error)
