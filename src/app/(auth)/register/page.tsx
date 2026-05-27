'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [showPassword, setShowPassword] = useState(false)

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Full name is required.'
    if (!form.email) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.'
    if (!form.password) e.password = 'Password is required.'
    else if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match.'
    return e
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: '' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    router.push('/dashboard')
  }

  function getStrength(pw: string) {
    if (!pw) return 0
    let s = 0
    if (pw.length >= 8) s++
    if (/[A-Z]/.test(pw)) s++
    if (/[0-9]/.test(pw)) s++
    if (/[^A-Za-z0-9]/.test(pw)) s++
    return s
  }

  const strength = getStrength(form.password)
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong']
  const strengthColors = ['', 'bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 mb-4 shadow-lg shadow-indigo-500/30">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Create your account</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Start your free 14-day trial today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Aditya Gupta"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                errors.name ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400'
              }`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                errors.email ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400'
              }`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className={`w-full px-4 py-2.5 pr-11 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                  errors.password ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            {/* Password strength */}
            {form.password && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColors[strength] : 'bg-slate-200 dark:bg-slate-700'}`} />
                  ))}
                </div>
                <p className={`text-xs ${strength <= 1 ? 'text-red-500' : strength === 2 ? 'text-yellow-500' : strength === 3 ? 'text-blue-500' : 'text-green-500'}`}>
                  {strengthLabels[strength]} password
                </p>
              </div>
            )}
            {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
          </div>

          {/* Confirm */}
          <div>
            <label htmlFor="confirm" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Confirm password
            </label>
            <input
              id="confirm"
              name="confirm"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={form.confirm}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                errors.confirm ? 'border-red-400 dark:border-red-600' : 'border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400'
              }`}
            />
            {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            By creating an account, you agree to our{' '}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Terms of Service</a>
            {' '}and{' '}
            <a href="#" className="text-indigo-600 dark:text-indigo-400 hover:underline">Privacy Policy</a>.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 active:scale-[0.98]"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Creating account…
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
      </div>

      <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
        Already have an account?{' '}
        <Link href="/login" className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
