import Sidebar from '@/components/Sidebar'
import AuthGuard from '@/components/AuthGuard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
        <Sidebar />
        <main className="flex-1 min-w-0 pt-14 lg:pt-0">
          {children}
        </main>
      </div>
    </AuthGuard>
  )
}
