'use client'

import { useRef, useState } from 'react'

type UploadFile = {
  id: string
  name: string
  size: number
  type: string
  progress: number
  status: 'uploading' | 'processing' | 'done' | 'error'
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const acceptedTypes = ['.pdf', '.docx', '.doc', '.xlsx', '.xls', '.pptx', '.ppt', '.png', '.jpg', '.jpeg', '.txt']

export default function UploadPage() {
  const [files, setFiles] = useState<UploadFile[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function addFiles(newFiles: FileList | null) {
    if (!newFiles) return
    const toAdd: UploadFile[] = Array.from(newFiles).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      type: f.type,
      progress: 0,
      status: 'uploading',
    }))
    setFiles((prev) => [...prev, ...toAdd])

    toAdd.forEach((file) => {
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 25
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) =>
            prev.map((f) => f.id === file.id ? { ...f, progress: 100, status: 'processing' } : f)
          )
          setTimeout(() => {
            setFiles((prev) =>
              prev.map((f) => f.id === file.id ? { ...f, status: 'done' } : f)
            )
          }, 1500)
        } else {
          setFiles((prev) =>
            prev.map((f) => f.id === file.id ? { ...f, progress: Math.min(progress, 99) } : f)
          )
        }
      }, 300)
    })
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    addFiles(e.dataTransfer.files)
  }

  function removeFile(id: string) {
    setFiles((f) => f.filter((x) => x.id !== id))
  }

  const statusConfig = {
    uploading: { label: 'Uploading…', color: 'text-indigo-600 dark:text-indigo-400', bar: 'bg-indigo-500' },
    processing: { label: 'Processing…', color: 'text-amber-600 dark:text-amber-400', bar: 'bg-amber-500' },
    done: { label: 'Ready', color: 'text-emerald-600 dark:text-emerald-400', bar: 'bg-emerald-500' },
    error: { label: 'Failed', color: 'text-red-600 dark:text-red-400', bar: 'bg-red-500' },
  }

  const doneCount = files.filter((f) => f.status === 'done').length

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Upload Documents</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">
          Upload documents to analyze, summarize, and query with AI.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
          dragging
            ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/50'
            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        <div className={`inline-flex w-16 h-16 items-center justify-center rounded-2xl mb-4 transition-colors ${dragging ? 'bg-indigo-600 text-white' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'}`}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
          {dragging ? 'Drop files here' : 'Drag & drop files here'}
        </h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
          or click to browse from your computer
        </p>
        <div className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-medium px-5 py-2 rounded-xl text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Browse Files
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {acceptedTypes.map((ext) => (
            <span key={ext} className="text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded">
              {ext}
            </span>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">Maximum file size: 50 MB per file</p>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Uploads ({doneCount}/{files.length} done)
            </h2>
            {files.every((f) => f.status === 'done' || f.status === 'error') && (
              <button
                onClick={() => setFiles([])}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="space-y-3">
            {files.map((file) => {
              const sc = statusConfig[file.status]
              return (
                <div key={file.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${file.status === 'done' ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400' : file.status === 'error' ? 'bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-400' : 'bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'}`}>
                      {file.status === 'done' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : file.status === 'error' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{file.name}</p>
                          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{formatBytes(file.size)}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`text-xs font-medium ${sc.color}`}>{sc.label}</span>
                          <button
                            onClick={() => removeFile(file.id)}
                            className="p-1 rounded-lg text-slate-300 dark:text-slate-600 hover:text-slate-500 dark:hover:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {(file.status === 'uploading' || file.status === 'processing') && (
                        <div className="mt-2">
                          <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${sc.bar} rounded-full transition-all duration-300 ${file.status === 'processing' ? 'animate-pulse' : ''}`}
                              style={{ width: `${file.status === 'processing' ? 100 : file.progress}%` }}
                            />
                          </div>
                          {file.status === 'uploading' && (
                            <p className="text-xs text-slate-400 mt-1">{Math.round(file.progress)}%</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {doneCount > 0 && doneCount === files.filter((f) => f.status !== 'error').length && (
            <div className="mt-4 p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900 rounded-2xl flex items-center gap-3">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300">All files processed successfully!</p>
                <p className="text-xs text-emerald-600 dark:text-emerald-500">Your documents are ready to query with AI.</p>
              </div>
              <a href="/dashboard/documents" className="ml-auto text-sm font-medium text-emerald-700 dark:text-emerald-400 hover:underline flex-shrink-0">
                View Documents →
              </a>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Best with PDFs', desc: 'Native PDFs with selectable text give the best AI analysis quality.' },
          { title: 'Bulk uploads', desc: 'Upload up to 20 files at once to process your entire document library.' },
          { title: 'Auto-indexing', desc: 'All uploaded documents are automatically indexed and ready for Q&A.' },
        ].map((tip) => (
          <div key={tip.title} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 flex items-center justify-center mb-3">
              <svg className="w-4 h-4 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">{tip.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{tip.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
