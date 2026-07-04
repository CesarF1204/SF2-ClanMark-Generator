export type LayerStage = 'background' | 'middle' | 'foreground'

export interface AssetItem {
  id: string
  filename: string
  path: string
}

export interface Category {
  id: string
  name: string
  path: string
  assets: AssetItem[]
}

export interface StageCategories {
  background: Category[]
  middle: Category[]
  foreground: Category[]
}

// Legacy type alias for backwards compatibility
export type AssetManifest = StageCategories

export interface ClanMarkSelection {
  background: AssetItem | null
  middle: AssetItem | null
  foreground: AssetItem | null
}

export interface StageConfig {
  stage: LayerStage
  title: string
  subtitle: string
  folderName: string
}

export interface StageState {
  selectedCategoryId: string | null
  selectedAsset: AssetItem | null
}

export interface FullSelection {
  background: StageState
  middle: StageState
  foreground: StageState
}