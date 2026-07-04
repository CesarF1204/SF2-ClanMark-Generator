import type { StageCategories } from '../types'
import { assetManifest } from '../data/assetManifest'

// Simply return the pre-generated manifest from the build script
export function scanAssets(): StageCategories {
  return assetManifest
}

// Helper to get display name for a category
export function getCategoryDisplayName(categoryId: string, _stage?: string): string {
  return categoryId
    .replace(/^logo_/, '')
    .replace(/_(\d+)$/, ' $1')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}