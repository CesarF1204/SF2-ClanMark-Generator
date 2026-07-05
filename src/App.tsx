import { ThemeProvider } from './context/ThemeProvider'
import { Header } from './components/layout/Header'
import { ClanMarkBuilder } from './components/clan-mark/ClanMarkBuilder'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg)] flex flex-col">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--glow)_0%,_transparent_50%)] opacity-40" />
        <Header />
        <main className="relative flex-1 pb-16 sm:pb-0">
          <ClanMarkBuilder />
        </main>
        <footer className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)]/90 py-3 text-center text-xs text-[var(--muted)] backdrop-blur-sm sm:py-4">
          Special Force 2 Clan Mark Generator by Ces — 2026
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
