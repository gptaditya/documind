export default function LandingFooter() {
  return (
    <footer className="bg-slate-900 dark:bg-black py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-400">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-linear-to-br from-indigo-500 to-indigo-700 rounded-lg flex items-center justify-center">
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
  )
}
