'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Logo from './Logo'
import ThemeToggle from './ThemeToggle'
import FileUploader from './FileUploader'
import { logoutUser } from '@/lib/api/auth'
import { clearAuth } from '@/lib/auth/token'
import { ROUTES } from '@/constants/routes'

export default function DashboardNavbar() {
  const router = useRouter()

  async function handleLogout() {
    await logoutUser()
    clearAuth()
    router.push(ROUTES.login)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href={ROUTES.dashboard}>
            <Logo size="sm" />
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <FileUploader />
            <button
              onClick={handleLogout}
              title="Sign out"
              className="w-9 h-9 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-500/10 dark:hover:bg-red-500/15 transition-colors dark:bg-slate-800 bg-gray-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
