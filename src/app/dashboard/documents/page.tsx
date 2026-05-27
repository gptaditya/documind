'use client'

import Link from 'next/link'
import { useState } from 'react'

const allDocs = [
  { id: 1, name: 'Q3 Financial Report 2025.pdf', type: 'PDF', size: '4.2 MB', status: 'processed', date: 'May 27, 2025', queries: 14, pages: 32 },
  { id: 2, name: 'Product Roadmap H2.docx', type: 'DOCX', size: '1.8 MB', status: 'processed', date: 'May 27, 2025', queries: 7, pages: 15 },
  { id: 3, name: 'Legal Contract — NDA.pdf', type: 'PDF', size: '890 KB', status: 'processing', date: 'May 26, 2025', queries: 0, pages: 8 },
  { id: 4, name: 'Customer Research Summary.xlsx', type: 'XLSX', size: '2.1 MB', status: 'processed', date: 'May 26, 2025', queries: 23, pages: 5 },
  { id: 5, name: 'Architecture Diagram v2.png', type: 'PNG', size: '5.6 MB', status: 'processed', date: 'May 25, 2025', queries: 3, pages: 1 },
  { id: 6, name: 'Marketing Strategy 2025.pptx', type: 'PPTX', size: '12.4 MB', status: 'processed', date: 'May 24, 2025', queries: 11, pages: 42 },
  { id: 7, name: 'Employee Handbook v3.pdf', type: 'PDF', size: '3.3 MB', status: 'processed', date: 'May 23, 2025', queries: 6, pages: 28 },
  { id: 8, name: 'Invoice_INV-20250522.pdf', type: 'PDF', size: '245 KB', status: 'processed', date: 'May 22, 2025', queries: 2, pages: 2 },
  { id: 9, name: 'Competitive Analysis.docx', type: 'DOCX', size: '1.1 MB', status: 'failed', date: 'May 21, 2025', queries: 0, pages: 0 },
  { id: 10, name: 'Onboarding Guide 2025.pdf', type: 'PDF', size: '6.7 MB', status: 'processed', date: 'May 20, 2025', queries: 18, pages: 54 },
]

const typeColors: Record<string, string> = {
  PDF: 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400',
  DOCX: 'bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400',
  XLSX: 'bg-green-100 dark:bg-green-950 text-green-600 dark:text-green-400',
  PNG: 'bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400',
  PPTX: 'bg-orange-100 dark:bg-orange-950 text-orange-600 dark:text-orange-400',
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  processed: { label: 'Ready', classes: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950' },
  processing: { label: 'Processing', classes: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950' },
  failed: { label: 'Failed', classes: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950' },
}

type ViewMode = 'list' | 'grid'
type Filter = 'all' | 'processed' | 'processing' | 'failed'

export default function DocumentsPage() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<Filter>('all')
  const [view, setView] = useState<ViewMode>('list')
  const [selected, setSelected] = useState<number[]>([])

  const filtered = allDocs.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || d.status === filter
    return matchSearch && matchFilter
  })

  function toggleSelect(id: number) {
    setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Documents</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{allDocs.length} documents in your workspace</p>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold px-5 py-2.5 rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25 text-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Upload
        </Link>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4">
          {/* Search */}
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search documents…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            {(['all', 'processed', 'processing', 'failed'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                  filter === f
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-lg transition-all ${view === 'list' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-lg transition-all ${view === 'grid' ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bulk actions */}
        {selected.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-2 bg-indigo-50 dark:bg-indigo-950 border-t border-indigo-100 dark:border-indigo-900">
            <span className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">{selected.length} selected</span>
            <button className="text-xs text-red-600 dark:text-red-400 hover:underline" onClick={() => setSelected([])}>Delete</button>
            <button className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline ml-auto" onClick={() => setSelected([])}>Clear selection</button>
          </div>
        )}
      </div>

      {/* List view */}
      {view === 'list' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-medium">No documents found</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((doc) => {
                const st = statusConfig[doc.status]
                return (
                  <div
                    key={doc.id}
                    className={`flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${selected.includes(doc.id) ? 'bg-indigo-50/50 dark:bg-indigo-950/30' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={selected.includes(doc.id)}
                      onChange={() => toggleSelect(doc.id)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-indigo-600 focus:ring-indigo-500/50"
                    />
                    <div className={`text-xs font-bold px-2 py-1 rounded-lg flex-shrink-0 ${typeColors[doc.type] ?? 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                      {doc.type}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{doc.name}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">{doc.size} · {doc.pages > 0 ? `${doc.pages} pages` : 'Processing…'} · {doc.date}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${st.classes}`}>
                        {st.label}
                      </span>
                      {doc.queries > 0 && (
                        <span className="hidden sm:flex items-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                          {doc.queries}
                        </span>
                      )}
                      <button className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        /* Grid view */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((doc) => {
            const st = statusConfig[doc.status]
            return (
              <div
                key={doc.id}
                className={`bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer ${selected.includes(doc.id) ? 'ring-2 ring-indigo-500 border-indigo-300 dark:border-indigo-700' : ''}`}
                onClick={() => toggleSelect(doc.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-xs font-bold px-2 py-1 rounded-lg ${typeColors[doc.type] ?? 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                    {doc.type}
                  </div>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${st.classes}`}>
                    {st.label}
                  </span>
                </div>
                <div className="flex items-center justify-center h-16 mb-3">
                  <svg className="w-12 h-12 text-slate-200 dark:text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate mb-1">{doc.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">{doc.size} · {doc.date}</p>
                {doc.queries > 0 && (
                  <div className="mt-2 flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    {doc.queries} queries
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4">
          Showing {filtered.length} of {allDocs.length} documents
        </p>
      )}
    </div>
  )
}
