import { memo, useMemo } from 'react'
import type { AssetItem, Category, LayerStage, StageState } from '../../types'
import { STAGE_CONFIGS } from '../../constants/stages'
import { CategorySelector } from './CategorySelector'
import { ThumbnailGrid } from './ThumbnailGrid'

interface LayerStageSectionProps {
  stage: LayerStage
  categories: Category[]
  stageState: StageState
  onSelectCategory: (categoryId: string) => void
  onSelectAsset: (asset: AssetItem) => void
  onDeselect: () => void
  stepNumber: number
}

export const LayerStageSection = memo(function LayerStageSection({
  stage,
  categories,
  stageState,
  onSelectCategory,
  onSelectAsset,
  onDeselect,
  stepNumber,
}: LayerStageSectionProps) {
  const config = STAGE_CONFIGS.find((c) => c.stage === stage)!

  // Get current category's assets
  const currentAssets = useMemo(() => {
    if (!stageState.selectedCategoryId) return []
    const category = categories.find(c => c.id === stageState.selectedCategoryId)
    return category?.assets ?? []
  }, [stageState.selectedCategoryId, categories])

  return (
    <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-5 backdrop-blur-sm">
      <header className="mb-4 flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-sm font-bold text-[var(--accent)]">
          {stepNumber}
        </span>
        <div>
          <h2 className="text-lg font-semibold tracking-tight text-[var(--text)]">
            {config.title}
          </h2>
          <p className="text-sm text-[var(--muted)]">{config.subtitle}</p>
        </div>
      </header>

      {/* Category Selector */}
      <div className="mb-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
          Select Category
        </p>
        <CategorySelector
          stage={stage}
          categories={categories}
          selectedCategoryId={stageState.selectedCategoryId}
          onSelectCategory={onSelectCategory}
        />
      </div>

      {/* Asset Thumbnails - only show if category is selected */}
      {stageState.selectedCategoryId && (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-[var(--muted)]">
            Select Image
          </p>
          <ThumbnailGrid
            assets={currentAssets}
            selectedId={stageState.selectedAsset?.id ?? null}
            onSelect={onSelectAsset}
            onDeselect={onDeselect}
          />
        </div>
      )}
    </section>
  )
})