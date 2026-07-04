import { ThemeProvider } from './context/ThemeProvider'
import { Header } from './components/layout/Header'
import { ClanMarkBuilder } from './components/clan-mark/ClanMarkBuilder'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--bg)]">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--glow)_0%,_transparent_50%)] opacity-40" />
        <Header />
        <main className="relative">
          <ClanMarkBuilder />
        </main>
        <footer className="border-t border-[var(--border)] py-6 text-center text-xs text-[var(--muted)]">
          Special Force 2 Clan Mark Generator — 2026
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
