import DashboardNavbar from '@/components/DashboardNavbar'
import AuthGuard from '@/components/AuthGuard'
import { Toaster } from 'sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <DashboardNavbar />
        <main className="max-w-7xl mx-auto">
          {children}
        </main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast: 'font-sans text-sm',
            },
          }}
          richColors
          closeButton
        />
      </div>
    </AuthGuard>
  )
}
