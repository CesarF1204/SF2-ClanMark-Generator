import { memo, useCallback } from 'react'
import type { Category, LayerStage } from '../../types'
import { STAGE_LABELS } from '../../constants/stages'

interface CategorySelectorProps {
  stage: LayerStage
  categories: Category[]
  selectedCategoryId: string | null
  onSelectCategory: (categoryId: string) => void
  onDeselect: () => void
}

export const CategorySelector = memo(function CategorySelector({
  stage,
  categories,
  selectedCategoryId,
  onSelectCategory,
  onDeselect,
}: CategorySelectorProps) {
  const handleNoneClick = useCallback(() => {
    onDeselect()
  }, [onDeselect])

  const handleCategoryClick = useCallback((categoryId: string) => {
    onSelectCategory(categoryId)
  }, [onSelectCategory])

  const stageLabel = STAGE_LABELS[stage]

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {/* None button - always available */}
        <button
          type="button"
          onClick={handleNoneClick}
          className={[
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
            'border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
            selectedCategoryId === null
              ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
              : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--text)]',
          ].join(' ')}
        >
          None
        </button>

        {/* Category buttons */}
        {categories.map((category, index) => (
          <button
            key={category.id}
            type="button"
            onClick={() => handleCategoryClick(category.id)}
            className={[
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200',
              'border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
              selectedCategoryId === category.id
                ? 'border-[var(--accent)] bg-[var(--accent)] text-black'
                : 'border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] hover:border-[var(--accent)]/50 hover:text-[var(--text)]',
            ].join(' ')}
          >
            {stageLabel} {index + 1}
          </button>
        ))}
      </div>

      {/* Selected category info */}
      {selectedCategoryId && (
        <p className="text-xs text-[var(--muted)]">
          {categories.find(c => c.id === selectedCategoryId)?.assets.length ?? 0} images available
        </p>
      )}
    </div>
  )
})