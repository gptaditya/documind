import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50/80 via-white to-cyan-50/60 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            Powered by Advanced AI — Now in Beta
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
            Understand Any
            <span className="block bg-linear-to-r from-indigo-600 via-violet-600 to-cyan-500 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Document Instantly
            </span>
          </h1>

          <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            DocuMind uses state-of-the-art AI to extract insights, answer questions, and surface key information from any document — in seconds, not hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.register}
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 hover:-translate-y-0.5 active:translate-y-0"
            >
              Get Started Free
            </Link>
            <Link
              href={ROUTES.dashboard}
              className="inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold px-8 py-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
            >
              <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              View Demo
            </Link>
          </div>
        </div>

        {/* Mock UI Preview */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700/60 shadow-2xl shadow-slate-300/40 dark:shadow-none bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3 px-4 py-3 bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4 bg-white dark:bg-slate-900 rounded-md px-4 py-1 text-xs text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 flex items-center gap-2">
                <svg className="w-3 h-3 text-green-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                app.documind.ai/dashboard
              </div>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="hidden md:flex flex-col gap-2">
                <div className="h-7 bg-indigo-100 dark:bg-indigo-950 rounded-lg w-4/5" />
                {[1,2,3,4].map(i => (
                  <div key={i} className={`h-7 rounded-lg ${i === 1 ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-100 dark:bg-slate-800/60'} ${i === 3 ? 'w-3/4' : 'w-full'}`} />
                ))}
              </div>
              <div className="md:col-span-3 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[
                    'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-100 dark:border-indigo-900',
                    'bg-emerald-50 dark:bg-emerald-950/80 border-emerald-100 dark:border-emerald-900',
                    'bg-violet-50 dark:bg-violet-950/80 border-violet-100 dark:border-violet-900',
                  ].map((cls, i) => (
                    <div key={i} className={`p-3 rounded-xl border ${cls}`}>
                      <div className="h-2 bg-slate-300 dark:bg-slate-700 rounded w-1/2 mb-2" />
                      <div className="h-5 bg-slate-200 dark:bg-slate-600 rounded w-2/3" />
                    </div>
                  ))}
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-600 shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded w-3/4" />
                      <div className="h-2 bg-slate-200 dark:bg-slate-600 rounded w-full" />
                      <div className="h-2 bg-indigo-200 dark:bg-indigo-800 rounded w-2/3" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {[0.9, 0.7, 0.85, 0.6].map((w, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 shrink-0" />
                      <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded flex-1" style={{ maxWidth: `${w * 100}%` }} />
                      <div className="w-14 h-5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
