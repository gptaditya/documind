const stats = [
  { value: '10M+', label: 'Documents Processed' },
  { value: '50K+', label: 'Teams Using DocuMind' },
  { value: '99.9%', label: 'Uptime SLA' },
  { value: '<2s', label: 'Avg. Response Time' },
]

export default function StatsBar() {
  return (
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
  )
}
