import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

export default function CtaSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 to-violet-700 dark:from-indigo-700 dark:to-violet-800 p-12 lg:p-16">
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
                href={ROUTES.register}
                className="inline-flex items-center justify-center bg-white text-indigo-700 font-semibold px-8 py-4 rounded-xl hover:bg-indigo-50 transition-all hover:shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                href={ROUTES.login}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-xl border border-white/20 transition-all"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
