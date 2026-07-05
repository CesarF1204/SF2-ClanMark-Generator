import type { AssetItem } from '../../types'
import { ThumbnailItem } from './ThumbnailItem'

interface ThumbnailGridProps {
  assets: AssetItem[]
  selectedId: string | null
  onSelect: (asset: AssetItem) => void
  onDeselect?: () => void
}

export function ThumbnailGrid({
  assets,
  selectedId,
  onSelect,
  onDeselect,
}: ThumbnailGridProps) {
  if (assets.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50 px-6 py-10 text-center">
        <p className="text-sm text-[var(--muted)]">
          Select a category to view available images.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4 xl:grid-cols-5">
      {assets.map((asset) => (
        <ThumbnailItem
          key={asset.id}
          asset={asset}
          isSelected={selectedId === asset.id}
          onSelect={onSelect}
          onDeselect={onDeselect}
        />
      ))}
    </div>
  )
}