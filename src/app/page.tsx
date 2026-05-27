import Link from 'next/link'
import Navbar from '@/components/Navbar'

const features = [
  {
    title: 'Instant Q&A',
    description: 'Ask any question in plain English and get precise answers drawn directly from your documents.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    title: 'Smart Summaries',
    description: 'Get concise, structured summaries of lengthy reports, contracts, and research papers in seconds.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: 'Multi-format Support',
    description: 'Upload PDFs, Word docs, spreadsheets, images, and more. DocuMind handles them all seamlessly.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: 'Key Insight Extraction',
    description: 'Automatically surface dates, figures, names, obligations, and other critical data points.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
  },
  {
    title: 'Collaborative Workspaces',
    description: 'Share documents and AI-generated insights with your team. Everyone stays on the same page.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
  {
    title: 'Enterprise Security',
    description: 'End-to-end encryption, SOC 2 compliance, and granular access controls keep your data safe.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
]

const steps = [
  { title: 'Upload your documents', description: 'Drag and drop PDFs, Word files, spreadsheets, or images. We support 30+ formats.' },
  { title: 'AI processes everything', description: 'Our models read, understand, and index your content in seconds — ready for any question.' },
  { title: 'Get instant answers', description: 'Ask questions, request summaries, or extract key data. Get accurate results immediately.' },
]

const stats = [
  { value: '10M+', label: 'Documents Processed' },
  { value: '50K+', label: 'Teams Using DocuMind' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<2s', label: 'Avg. Response Time' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/80 via-white to-cyan-50/60 dark:from-indigo-950/40 dark:via-slate-950 dark:to-slate-950 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-400/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Powered by Advanced AI — Now in Beta
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight tracking-tight">
              Understand Any
              <span className="block bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 dark:from-indigo-400 dark:via-violet-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Document Instantly
              </span>
            </h1>

            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              DocuMind uses state-of-the-art AI to extract insights, answer questions, and surface key information from any document — in seconds, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              
              <Link
                href="/dashboard"
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
                  <svg className="w-3 h-3 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      <div className="w-8 h-8 rounded-lg bg-indigo-600 flex-shrink-0" />
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
                        <div className="w-6 h-6 rounded bg-slate-200 dark:bg-slate-700 flex-shrink-0" />
                        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded flex-1" style={{ maxWidth: `${w * 100}%` }} />
                        <div className="w-14 h-5 bg-white dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-indigo-600 dark:bg-indigo-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-indigo-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to work smarter
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful AI capabilities designed to transform how you interact with your documents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-800/60 hover:shadow-lg hover:shadow-indigo-500/5 transition-all hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-4 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white dark:group-hover:bg-indigo-500 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Up and running in minutes
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] right-0 h-px bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-800" />
                )}
                <div className="relative inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-xl mb-5 shadow-lg shadow-indigo-500/30">
                  {i + 1}
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">{step.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-700 dark:from-indigo-700 dark:to-violet-800 p-12 lg:p-16">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent)] pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                Ready to transform your document workflow?
              </h2>
              <p className="text-indigo-100 mb-8 text-lg max-w-xl mx-auto">
                Join 50,000+ teams already using DocuMind to work smarter and faster.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-black py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="font-bold text-white">Docu<span className="text-indigo-400">Mind</span></span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Docs</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
            <p className="text-sm">© 2025 DocuMind. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
