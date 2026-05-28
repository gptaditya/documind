const steps = [
  { title: 'Upload your documents', description: 'Drag and drop PDFs, Word files, spreadsheets, or images. We support 30+ formats.' },
  { title: 'AI processes everything', description: 'Our models read, understand, and index your content in seconds — ready for any question.' },
  { title: 'Get instant answers', description: 'Ask questions, request summaries, or extract key data. Get accurate results immediately.' },
]

export default function HowItWorksSection() {
  return (
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
                <div className="hidden md:block absolute top-7 left-[calc(50%+2rem)] right-0 h-px bg-linear-to-r from-indigo-300 to-transparent dark:from-indigo-800" />
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
  )
}
