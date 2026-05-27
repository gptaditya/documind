'use client'

import { useState } from 'react'

type Tab = 'profile' | 'appearance' | 'notifications' | 'security'

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile')
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ name: 'Aditya Gupta', email: 'adityacse207@gmail.com', bio: '', company: '' })
  const [notifications, setNotifications] = useState({ email: true, processing: true, weekly: false, marketing: false })

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    {
      id: 'profile', label: 'Profile',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
    },
    {
      id: 'appearance', label: 'Appearance',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>,
    },
    {
      id: 'notifications', label: 'Notifications',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
    },
    {
      id: 'security', label: 'Security',
      icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
    },
  ]

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">Manage your account preferences and workspace settings.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <nav className="lg:w-52 flex-shrink-0">
          <div className="flex lg:flex-col gap-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all ${
                  tab === t.id
                    ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span className={tab === t.id ? 'text-indigo-600 dark:text-indigo-400' : ''}>{t.icon}</span>
                <span className="hidden sm:block">{t.label}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Profile */}
          {tab === 'profile' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Profile Information</h2>

              {/* Avatar */}
              <div className="flex items-center gap-5 mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                  A
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-1">Profile Photo</p>
                  <div className="flex gap-2">
                    <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">Change photo</button>
                    <span className="text-slate-300 dark:text-slate-600">·</span>
                    <button className="text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors">Remove</button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company</label>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile((p) => ({ ...p, company: e.target.value }))}
                      placeholder="Your company name"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Bio</label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))}
                    rows={3}
                    placeholder="Tell us a bit about yourself…"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                {saved && (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Saved
                  </span>
                )}
                <button
                  onClick={save}
                  className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Appearance */}
          {tab === 'appearance' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Appearance</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Theme</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'light', label: 'Light', bg: 'bg-white border-slate-200', preview: 'bg-slate-100' },
                      { id: 'dark', label: 'Dark', bg: 'bg-slate-900 border-slate-700', preview: 'bg-slate-800' },
                      { id: 'system', label: 'System', bg: 'bg-gradient-to-br from-white to-slate-900 border-slate-300', preview: 'bg-gradient-to-br from-slate-100 to-slate-800' },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        className={`relative rounded-xl border-2 p-3 text-center transition-all hover:border-indigo-400 ${theme.bg} ${theme.id === 'system' ? 'border-indigo-500 ring-2 ring-indigo-500/30' : ''}`}
                      >
                        <div className={`h-10 rounded-lg mb-2 ${theme.preview}`} />
                        <span className={`text-xs font-medium ${theme.id === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>{theme.label}</span>
                        {theme.id === 'system' && (
                          <div className="absolute top-2 right-2 w-4 h-4 bg-indigo-600 rounded-full flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Use the toggle button in the sidebar to switch themes instantly.</p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Language</label>
                  <select className="w-full sm:w-48 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all">
                    <option>English (US)</option>
                    <option>English (UK)</option>
                    <option>Hindi</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                {saved && (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Saved
                  </span>
                )}
                <button onClick={save} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Notifications */}
          {tab === 'notifications' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Notification Preferences</h2>
              <div className="space-y-4">
                {[
                  { key: 'email' as const, label: 'Email notifications', desc: 'Receive notifications via email.' },
                  { key: 'processing' as const, label: 'Document processing', desc: 'Get notified when your documents finish processing.' },
                  { key: 'weekly' as const, label: 'Weekly digest', desc: 'A weekly summary of your document activity.' },
                  { key: 'marketing' as const, label: 'Product updates', desc: 'News about new features and DocuMind updates.' },
                ].map((n) => (
                  <div key={n.key} className="flex items-start justify-between gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div>
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{n.label}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full flex-shrink-0 transition-colors ${notifications[n.key] ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                      <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${notifications[n.key] ? 'translate-x-4.5' : 'translate-x-0.5'}`} style={{ transform: notifications[n.key] ? 'translateX(18px)' : 'translateX(2px)' }} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                {saved && (
                  <span className="flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    Saved
                  </span>
                )}
                <button onClick={save} className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security */}
          {tab === 'security' && (
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Change Password</h2>
                <div className="space-y-4">
                  {['Current password', 'New password', 'Confirm new password'].map((label) => (
                    <div key={label}>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 dark:focus:border-indigo-400 transition-all"
                      />
                    </div>
                  ))}
                  <button
                    onClick={save}
                    className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-sm font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25"
                  >
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">Two-Factor Authentication</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Add an extra layer of security to your account.</p>
                <button className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Enable 2FA
                </button>
              </div>

              <div className="bg-red-50 dark:bg-red-950/30 rounded-2xl border border-red-200 dark:border-red-900 p-6">
                <h2 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-1">Danger Zone</h2>
                <p className="text-sm text-red-600 dark:text-red-400 mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
                <button className="px-5 py-2.5 text-sm font-semibold text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800 rounded-xl hover:bg-red-100 dark:hover:bg-red-950 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
