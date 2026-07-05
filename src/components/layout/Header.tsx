import { Link } from 'react-router-dom'
import { useTheme } from '../../hooks/useTheme'

export function Header() {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]/60 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg">
            <img
              src="/sf2_reborn_logo.png"
              alt="SF2 Reborn Logo"
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-[var(--text)] sm:text-xl">
              Clan Mark Generator
            </h1>
            <p className="hidden text-xs text-[var(--muted)] sm:block">
              Special Force 2 — Build your clan emblem
            </p>
          </div>
        </Link>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="cursor-pointer rounded-lg border border-[var(--border)] bg-[var(--surface)] p-2.5 text-[var(--text)] transition-colors hover:border-[var(--accent)]/50 hover:bg-[var(--surface-elevated)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
        >
          {theme === 'dark' ? (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}
