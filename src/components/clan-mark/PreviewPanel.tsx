import { memo } from 'react'
import type { FullSelection, LayerStage } from '../../types'
import { formatAssetName } from '../../utils/formatAssetName'
import { STAGE_LABELS } from '../../constants/stages'

interface PreviewPanelProps {
  layerUrls: string[]
  isComplete: boolean
}

export const PreviewPanel = memo(function PreviewPanel({
  layerUrls,
  isComplete,
}: PreviewPanelProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={[
          'relative flex aspect-square w-full max-w-[280px] items-center justify-center overflow-hidden rounded-2xl border-2',
          'bg-[var(--preview-bg)] shadow-2xl shadow-black/40',
          isComplete
            ? 'border-[var(--accent)]/60'
            : 'border-[var(--border)] border-dashed',
        ].join(' ')}
      >
        {layerUrls.length === 0 ? (
          <div className="px-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[var(--border)]">
              <svg
                className="h-8 w-8 text-[var(--muted)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium text-[var(--muted)]">
              Select layers to preview
            </p>
          </div>
        ) : (
          layerUrls.map((url, index) => (
            <img
              key={url}
              src={url}
              alt={`Layer ${index + 1}`}
              className="absolute inset-0 h-full w-full object-contain"
              // Reverse z-index: last layer (foreground) at bottom, first layer (background) on top
              style={{ zIndex: layerUrls.length - index }}
            />
          ))
        )}
      </div>
      <p className="mt-3 text-xs text-[var(--muted)]">
        {isComplete ? 'Clan mark ready' : `${layerUrls.length}/3 layers selected`}
      </p>
    </div>
  )
})

interface SelectionInfoProps {
  selection: FullSelection
  onDeselectStage?: (stage: LayerStage) => void
}

export const SelectionInfo = memo(function SelectionInfo({
  selection,
  onDeselectStage,
}: SelectionInfoProps) {
  const stages: LayerStage[] = ['background', 'middle', 'foreground']

  return (
    <div className="mt-4 w-full max-w-[280px] space-y-2 rounded-xl border border-[var(--border)] bg-[var(--surface)]/60 p-3">
      {stages.map((stage) => {
        const stageSelection = selection[stage]
        const label = STAGE_LABELS[stage]
        const asset = stageSelection.selectedAsset

        return (
          <div key={stage} className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[var(--muted)]">{label}</span>
            {asset && onDeselectStage ? (
              <div className="flex items-center gap-1 min-w-0">
                <span
                  className="truncate font-medium text-[var(--text)]"
                  title={formatAssetName(asset.filename)}
                >
                  {formatAssetName(asset.filename)}
                </span>
                <button
                  type="button"
                  onClick={() => onDeselectStage(stage)}
                  className="inline-flex shrink-0 items-center justify-center rounded-md p-1 text-[var(--muted)] transition-colors hover:bg-red-500/15 hover:text-red-400 active:bg-red-500/25"
                  aria-label={`Remove ${label} selection`}
                  title={`Clear ${label}`}
                >
                  <svg
                    className="h-4 w-4"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z" />
                  </svg>
                </button>
              </div>
            ) : (
              <span className="truncate font-medium text-[var(--muted)]/50 italic">
                None
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
})
