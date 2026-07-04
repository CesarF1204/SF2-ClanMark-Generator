export function formatAssetName(filename: string): string {
  return filename
    .replace(/\.png$/i, '')
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
