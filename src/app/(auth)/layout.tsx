import Link from 'next/link'
import Logo from '@/components/Logo'
import ThemeToggle from '@/components/ThemeToggle'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4">
        <Link href="/">
          <Logo size="sm" />
        </Link>
        <ThemeToggle />
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        {children}
      </div>

      {/* Footer */}
      <footer className="text-center py-4 text-xs text-slate-400 dark:text-slate-600">
        © 2025 DocuMind · <a href="#" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Privacy</a> · <a href="#" className="hover:text-slate-600 dark:hover:text-slate-400 transition-colors">Terms</a>
      </footer>
    </div>
  )
}
