import { useMemo } from 'react'
import { STAGE_CONFIGS } from '../../constants/stages'
import { scanAssets } from '../../utils/assetScanner'
import { useClanMarkState } from '../../hooks/useClanMarkState'
import { LayerStageSection } from './LayerStageSection'
import { PreviewPanel, SelectionInfo } from './PreviewPanel'
import { ActionBar } from './ActionBar'

export function ClanMarkBuilder() {
  // Dynamically scan all assets from the /assets directory
  const categories = useMemo(() => scanAssets(), [])

  const {
    selection,
    selectCategory,
    selectAsset,
    deselectStage,
    reset,
    randomize,
    layerUrls,
    hasSelection,
    isComplete,
  } = useClanMarkState(categories)

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_320px] lg:px-8">
      <div className="space-y-6">
        {STAGE_CONFIGS.map((config, index) => (
          <LayerStageSection
            key={config.stage}
            stage={config.stage}
            categories={categories[config.stage]}
            stageState={selection[config.stage]}
            onSelectCategory={(categoryId) => selectCategory(config.stage, categoryId)}
            onSelectAsset={(asset) => selectAsset(config.stage, asset)}
            onDeselect={() => deselectStage(config.stage)}
            stepNumber={index + 1}
          />
        ))}
      </div>

      <aside className="lg:sticky lg:top-8 lg:self-start">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 p-6 backdrop-blur-sm">
          <h2 className="mb-4 text-center text-sm font-semibold uppercase tracking-widest text-[var(--muted)]">
            Live Preview
          </h2>
          <PreviewPanel layerUrls={layerUrls} isComplete={isComplete} />
          <SelectionInfo selection={selection} />
          <ActionBar
            layerUrls={layerUrls}
            hasSelection={hasSelection}
            onReset={reset}
            onRandomize={randomize}
          />
        </div>
      </aside>
    </div>
  )
}