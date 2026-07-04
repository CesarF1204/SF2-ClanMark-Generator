import { memo, useCallback, useState } from 'react'
import {
  composeClanMarkToBlob,
  downloadBlob,
} from '../../utils/canvasExport'

interface ActionBarProps {
  layerUrls: string[]
  hasSelection: boolean
  onReset: () => void
  onRandomize: () => void
}

export const ActionBar = memo(function ActionBar({
  layerUrls,
  hasSelection,
  onReset,
  onRandomize,
}: ActionBarProps) {
  const [isExporting, setIsExporting] = useState(false)

  const handleDownload = useCallback(async () => {
    if (!hasSelection || layerUrls.length === 0) return

    setIsExporting(true)
    try {
      const blob = await composeClanMarkToBlob(layerUrls)
      const timestamp = Date.now()
      const filename = `sf2-clan-mark-${timestamp}.png`
      downloadBlob(blob, filename)
    } catch (err) {
      console.error(err)
      alert('Failed to export clan mark. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }, [hasSelection, layerUrls])

  return (
    <div className="mt-5 flex w-full max-w-[280px] flex-col gap-2">
      <button
        type="button"
        onClick={handleDownload}
        disabled={!hasSelection || isExporting}
        className={[
          'w-full rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]',
          hasSelection && !isExporting
            ? 'bg-[var(--accent)] text-black hover:bg-[var(--accent-hover)] hover:shadow-lg hover:shadow-[var(--accent)]/30'
            : 'cursor-not-allowed bg-[var(--surface-elevated)] text-[var(--muted)]',
        ].join(' ')}
      >
        {isExporting ? 'Exporting…' : 'Download Clan Mark'}
      </button>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRandomize}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--text)] transition-all hover:border-[var(--accent)]/50 hover:bg-[var(--surface-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          Randomize
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-xs font-semibold uppercase tracking-wide text-[var(--text)] transition-all hover:border-red-500/50 hover:bg-red-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
        >
          Reset
        </button>
      </div>
    </div>
  )
})
