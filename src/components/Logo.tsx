export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 'w-6 h-6', iconInner: 'w-3.5 h-3.5', text: 'text-base' },
    md: { icon: 'w-8 h-8', iconInner: 'w-5 h-5', text: 'text-xl' },
    lg: { icon: 'w-10 h-10', iconInner: 'w-6 h-6', text: 'text-2xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center gap-2.5">
      <div className={`${s.icon} bg-gradient-to-br from-indigo-500 to-indigo-700 dark:from-indigo-400 dark:to-indigo-600 rounded-xl flex items-center justify-center shadow-sm shadow-indigo-500/30 flex-shrink-0`}>
        <svg className={`${s.iconInner} text-white`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <span className={`font-bold ${s.text} text-slate-900 dark:text-white tracking-tight`}>
        Docu<span className="text-indigo-600 dark:text-indigo-400">Mind</span>
      </span>
    </div>
  )
}
