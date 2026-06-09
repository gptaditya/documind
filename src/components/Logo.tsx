import Image from "next/image"

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 'w-6 h-6', iconInner: 'w-3.5 h-3.5', text: 'text-base' },
    md: { icon: 'w-8 h-8', iconInner: 'w-5 h-5', text: 'text-xl' },
    lg: { icon: 'w-10 h-10', iconInner: 'w-6 h-6', text: 'text-2xl' },
  }
  const s = sizes[size]

  return (
    <div className="flex items-center -space-x-2">
        <Image
          src="/documind-logo.png"
          alt="DocuMind Logo"
          width={1500}
          height={1500}
          className="h-14 w-auto"
        />

      <span className={`font-bold ${s.text} text-slate-900 dark:text-white tracking-tight leading-3.5`}>
        Docu<span className="text-indigo-600 dark:text-indigo-400">Mind</span><br/>
      </span>
    </div>
  )
}
