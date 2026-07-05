import { memo, useCallback } from 'react'
import type { AssetItem } from '../../types'
import { formatAssetName } from '../../utils/formatAssetName'

interface ThumbnailItemProps {
  asset: AssetItem
  isSelected: boolean
  onSelect: (asset: AssetItem) => void
  onDeselect?: () => void
}

export const ThumbnailItem = memo(function ThumbnailItem({
  asset,
  isSelected,
  onSelect,
  onDeselect,
}: ThumbnailItemProps) {
  const handleClick = useCallback(() => {
    if (isSelected && onDeselect) {
      onDeselect()
    } else {
      onSelect(asset)
    }
  }, [asset, isSelected, onSelect, onDeselect])

  return (
    <button
      type="button"
      onClick={handleClick}
      title={formatAssetName(asset.filename)}
      aria-pressed={isSelected}
      className={[
        'group relative aspect-square overflow-hidden rounded-lg border-2 transition-all duration-200 cursor-pointer',
        'bg-[var(--surface)] hover:scale-[1.03] hover:shadow-lg hover:shadow-[var(--accent)]/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
        isSelected
          ? 'border-[var(--accent)] shadow-md shadow-[var(--accent)]/25 scale-[1.02]'
          : 'border-[var(--border)] hover:border-[var(--accent)]/50',
      ].join(' ')}
    >
      <img
        src={asset.path}
        alt={formatAssetName(asset.filename)}
        loading="lazy"
        className="h-full w-full object-contain p-1.5 transition-transform duration-200 group-hover:scale-105"
      />
      {isSelected && (
        <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-black">
          ✓
        </span>
      )}
    </button>
  )
})
