import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      {/* Main content — offset on mobile for fixed topbar */}
      <main className="flex-1 min-w-0 pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  )
}
