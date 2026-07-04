function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`))
    img.src = url
  })
}

export async function composeClanMarkToBlob(
  layerUrls: string[],
): Promise<Blob> {
  if (layerUrls.length === 0) {
    throw new Error('Select at least one layer to export.')
  }

  const images = await Promise.all(layerUrls.map(loadImage))

  const width = Math.max(...images.map((img) => img.naturalWidth))
  const height = Math.max(...images.map((img) => img.naturalHeight))

  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas context unavailable.')

  // Reverse order: foreground at bottom, middle in middle, background on top
  // This matches the preview's z-index order
  for (const img of [...images].reverse()) {
    ctx.drawImage(img, 0, 0)
  }

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Failed to export PNG.'))
      },
      'image/png',
    )
  })
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
