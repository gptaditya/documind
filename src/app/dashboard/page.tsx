import Link from 'next/link'

const stats = [
  {
    label: 'Total Documents',
    value: '248',
    change: '+12 this week',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    color: 'indigo',
  },
  {
    label: 'Processed Today',
    value: '34',
    change: '+8 vs yesterday',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'emerald',
  },
  {
    label: 'AI Queries',
    value: '1,420',
    change: '+240 this month',
    positive: true,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
    color: 'violet',
  },
  {
    label: 'Storage Used',
    value: '2.4 GB',
    change: '4.1 GB remaining',
    positive: null,
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    ),
    color: 'amber',
  },
]

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
  emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
  violet: 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400',
}

const recentDocs = [
  { name: 'Q3 Financial Report 2025.pdf', type: 'PDF', size: '4.2 MB', status: 'processed', time: '2 min ago', queries: 14 },
  { name: 'Product Roadmap H2.docx', type: 'DOCX', size: '1.8 MB', status: 'processed', time: '1 hr ago', queries: 7 },
  { name: 'Legal Contract — NDA.pdf', type: 'PDF', size: '890 KB', status: 'processing', time: '3 hrs ago', queries: 0 },
  { name: 'Customer Research Summary.xlsx', type: 'XLSX', size: '2.1 MB', status: 'processed', time: 'Yesterday', queries: 23 },
  { name: 'Architecture Diagram v2.png', type: 'PNG', size: '5.6 MB', status: 'processed', time: 'Yesterday', queries: 3 },
]

const typeColors: Record<string, string> = {
  PDF: 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400',
  DOCX: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
  XLSX: 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400',
  PNG: 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
}

const quickActions = [
  { label: 'Upload Document', href: '/dashboard/upload', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
    </svg>
  )},
  { label: 'Browse Documents', href: '/dashboard/documents', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" />
    </svg>
  )},
  { label: 'View Settings', href: '/dashboard/settings', icon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )},
]

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Good morning, Aditya 👋</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">Here&apos;s what&apos;s happening with your documents today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${colorMap[stat.color]}`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            <p className={`text-xs mt-1 ${stat.positive === true ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400 dark:text-slate-500'}`}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Documents */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent Documents</h2>
            <Link href="/dashboard/documents" className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentDocs.map((doc) => (
              <div key={doc.name} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${typeColors[doc.type] ?? 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{doc.name}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{doc.size} · {doc.time}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  {doc.status === 'processing' ? (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                      Processing
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Ready
                    </span>
                  )}
                  {doc.queries > 0 && (
                    <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:block">{doc.queries} queries</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
            <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-700 dark:hover:text-indigo-300 border border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900 transition-all"
                >
                  <span className="text-slate-400 dark:text-slate-500">{action.icon}</span>
                  {action.label}
                  <svg className="w-4 h-4 ml-auto text-slate-300 dark:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Storage card */}
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-700 dark:to-violet-800 rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Storage</h3>
              <span className="text-indigo-200 text-sm">6.5 GB total</span>
            </div>
            <div className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-indigo-100">Used</span>
                <span>2.4 GB</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-[37%] bg-white rounded-full" />
              </div>
            </div>
            <p className="text-indigo-200 text-xs mt-2">37% of your storage used</p>
          </div>
        </div>
      </div>
    </div>
  )
}
