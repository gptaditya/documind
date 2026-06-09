'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'
import { getUser } from '@/lib/auth/token'
import { fetchDocuments, uploadDocument, analyzeDocument } from '@/lib/api/documents'
import type { Document } from '@/types/document'

// Canvas dot-grid with physics repulsion on hover
function DotGrid({ mouseRef }: { mouseRef: React.RefObject<{ x: number; y: number } | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement!
    const ctx = canvas.getContext('2d')!

    const SPACING = 26
    const RADIUS = 1.5
    const REPEL_DIST = 100
    const REPEL_FORCE = 9

    type Dot = { ox: number; oy: number; x: number; y: number; vx: number; vy: number }
    let dots: Dot[] = []

    function build() {
      canvas!.width = parent.clientWidth
      canvas!.height = parent.clientHeight
      dots = []
      for (let x = SPACING / 2; x < canvas!.width; x += SPACING)
        for (let y = SPACING / 2; y < canvas!.height; y += SPACING)
          dots.push({ ox: x, oy: y, x, y, vx: 0, vy: 0 })
    }
    build()

    let raf: number
    function tick() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      const mp = mouseRef.current
      for (const d of dots) {
        if (mp) {
          const dx = d.x - mp.x
          const dy = d.y - mp.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_DIST && dist > 0) {
            const f = ((REPEL_DIST - dist) / REPEL_DIST) * REPEL_FORCE
            d.vx += (dx / dist) * f
            d.vy += (dy / dist) * f
          }
        }
        d.vx += (d.ox - d.x) * 0.12
        d.vy += (d.oy - d.y) * 0.12
        d.vx *= 0.72
        d.vy *= 0.72
        d.x += d.vx
        d.y += d.vy
        ctx.beginPath()
        ctx.arc(d.x, d.y, RADIUS, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(99,102,241,0.22)'
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    const ro = new ResizeObserver(build)
    ro.observe(parent)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [mouseRef])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function greeting(): string {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}

const colorMap: Record<string, string> = {
  indigo: 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400',
  emerald: 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400',
  violet: 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400',
}

const MAX_QUESTION = 100

export default function DashboardView() {
  const [docs, setDocs] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const user = useState(() => getUser())[0]

  const sectionRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const mousePosRef = useRef<{ x: number; y: number } | null>(null)
  const dragCounter = useRef(0)

  const [tilt, setTilt] = useState<{ rx: number; ry: number } | null>(null)
  const [dropOver, setDropOver] = useState(false)
  const [uploading, setUploading] = useState(false)

  // After-upload state
  const [uploadedFile, setUploadedFile] = useState<{ s3Key: string; fileName: string } | null>(null)
  const [question, setQuestion] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)

  useEffect(() => {
    fetchDocuments().then((result) => {
      if (result.success) setDocs(Array.isArray(result.data) ? result.data : [])
      setLoading(false)
    })
  }, [])

  const handleFiles = useCallback(async (files: File[]) => {
    if (!files.length) return
    const file = files[0]
    setUploading(true)
    const toastId = toast.loading(`Uploading ${file.name}…`)
    const result = await uploadDocument(file)
    if (result.success) {
      toast.success(`${file.name} uploaded`, { id: toastId })
      setUploadedFile({ s3Key: result.data.s3Key, fileName: result.data.fileName })
      setAnalysis(null)
      setQuestion('')
      fetchDocuments().then((r) => { if (r.success) setDocs(Array.isArray(r.data) ? r.data : []) })
    } else {
      toast.error(result.error ?? 'Upload failed', { id: toastId, description: file.name })
    }
    setUploading(false)
  }, [])

  async function handleAnalyze() {
    if (!uploadedFile || !question.trim()) return
    setAnalyzing(true)
    setAnalysis('')
    const toastId = toast.loading('Analysing document…')
    const result = await analyzeDocument(
      uploadedFile.s3Key,
      question.trim(),
      (chunk) => setAnalysis((prev) => (prev ?? '') + chunk),
    )
    if (result.success) {
      toast.success('Analysis complete', { id: toastId })
    } else {
      toast.error(result.error ?? 'Analysis failed', { id: toastId })
      setAnalysis(null)
    }
    setAnalyzing(false)
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    handleFiles(files)
    e.target.value = ''
  }

  function onDragEnter(e: React.DragEvent) { e.preventDefault(); dragCounter.current++; setDropOver(true) }
  function onDragOver(e: React.DragEvent) { e.preventDefault() }
  function onDragLeave() { dragCounter.current--; if (dragCounter.current === 0) setDropOver(false) }
  function onDrop(e: React.DragEvent) {
    e.preventDefault(); dragCounter.current = 0; setDropOver(false)
    handleFiles(Array.from(e.dataTransfer.files))
  }

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const section = sectionRef.current
    if (section) {
      const r = section.getBoundingClientRect()
      mousePosRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }
    }
    const card = cardRef.current
    if (card) {
      const r = card.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      setTilt({ rx: ((e.clientY - cy) / (r.height / 2)) * -10, ry: ((e.clientX - cx) / (r.width / 2)) * 10 })
    }
  }

  function handleMouseLeave() { mousePosRef.current = null; setTilt(null) }

  const today = new Date().toDateString()
  const totalDocs = docs.length
  const uploadedToday = docs.filter((d) => new Date(d.lastModified).toDateString() === today).length
  const totalSizeBytes = docs.reduce((sum, d) => sum + Number(d.size), 0)
  const totalSizeLabel = totalSizeBytes < 1024 * 1024
    ? `${(totalSizeBytes / 1024).toFixed(1)} KB`
    : `${(totalSizeBytes / (1024 * 1024)).toFixed(1)} MB`

  const stats = [
    {
      label: 'Total Documents',
      value: loading ? '—' : String(totalDocs),
      color: 'indigo',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
    {
      label: 'Uploaded Today',
      value: loading ? '—' : String(uploadedToday),
      color: 'emerald',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
    },
    {
      label: 'Total Size',
      value: loading ? '—' : (totalDocs === 0 ? '0 KB' : totalSizeLabel),
      color: 'violet',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V9l-5-5H7c-2 0-3 1-3 3z" />
        </svg>
      ),
    },
  ]

  const showEmpty = !loading && !uploadedFile

  return (
    <div className="min-h-[calc(100vh-3.5rem)] sm:h-[calc(100vh-3.5rem)] flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-5 sm:overflow-hidden">
      <style>{`
        @keyframes float3d {
          0%   { transform: perspective(900px) rotateX(5deg) rotateY(-8deg) translateY(0px); }
          33%  { transform: perspective(900px) rotateX(3deg) rotateY(8deg)  translateY(-12px); }
          66%  { transform: perspective(900px) rotateX(6deg) rotateY(2deg)  translateY(-6px); }
          100% { transform: perspective(900px) rotateX(5deg) rotateY(-8deg) translateY(0px); }
        }
        @keyframes shadow-pulse {
          0%, 100% { transform: scaleX(1);    opacity: 0.25; }
          50%       { transform: scaleX(0.72); opacity: 0.12; }
        }
        @keyframes badge-float {
          0%, 100% { transform: translateY(0px)  rotate(-6deg); }
          50%       { transform: translateY(-6px) rotate(-6deg); }
        }
      `}</style>

      {/* Header */}
      <div className="mb-3 sm:mb-4 shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          {greeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-xs sm:text-sm">Here&apos;s what&apos;s happening with your documents today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4 shrink-0">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 px-2.5 py-2 sm:px-4 sm:py-3 flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="min-w-0">
              <p className="text-[10px] sm:text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5 truncate">{stat.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
            </div>
            <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 ml-1 ${colorMap[stat.color]}`}>
              <span className="[&>svg]:w-3.5 [&>svg]:h-3.5 sm:[&>svg]:w-5 sm:[&>svg]:h-5">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
        className="hidden"
        onChange={handleInputChange}
      />

      {/* Empty upload placeholder */}
      {showEmpty && (
        <div
          ref={sectionRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onDragEnter={onDragEnter}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          className={`relative flex-1 min-h-0 overflow-hidden rounded-3xl border-2 bg-slate-50 dark:bg-slate-900 flex flex-col items-center justify-center select-none transition-colors duration-200 ${
            dropOver
              ? 'border-indigo-500 dark:border-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
              : 'border-dashed border-slate-200 dark:border-slate-800'
          }`}
        >
          <DotGrid mouseRef={mousePosRef} />

          {dropOver && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-3xl bg-indigo-950/70 backdrop-blur-[2px]">
              <div className="flex flex-col items-center gap-4 px-14 py-10 rounded-2xl border-2 border-dashed border-indigo-400">
                <svg className="w-14 h-14 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p className="text-xl font-bold text-white">Drop files to upload</p>
                <p className="text-sm text-indigo-300">PDF, DOCX, XLSX, PPTX, TXT, PNG, JPG</p>
              </div>
            </div>
          )}

          {/* 3-D document stack */}
          <div
            ref={cardRef}
            className="relative mb-2 z-10"
            style={
              tilt
                ? { transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`, transition: 'transform 0.18s ease-out', transformStyle: 'preserve-3d' }
                : { animation: 'float3d 5s ease-in-out infinite', transformStyle: 'preserve-3d' }
            }
          >
            <div className="absolute inset-0 w-32 h-40 sm:w-44 sm:h-56 rounded-2xl bg-indigo-300/40 dark:bg-indigo-800/40"
                 style={{ transform: 'translateX(14px) translateY(14px) rotate(8deg)', filter: 'blur(1px)' }} />
            <div className="absolute inset-0 w-32 h-40 sm:w-44 sm:h-56 rounded-2xl bg-indigo-200/60 dark:bg-indigo-700/50"
                 style={{ transform: 'translateX(7px) translateY(7px) rotate(4deg)' }} />
            <div className="relative w-32 h-40 sm:w-44 sm:h-56 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center gap-3 sm:gap-4 overflow-hidden">
              {tilt && (
                <div className="absolute inset-0 rounded-2xl pointer-events-none"
                     style={{ background: `radial-gradient(ellipse at ${50 + tilt.ry * 1.5}% ${50 + tilt.rx * 1.5}%, rgba(255,255,255,0.18), transparent 70%)` }} />
              )}
              <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 space-y-1.5 sm:space-y-2">
                <div className="h-1 sm:h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 w-3/4" />
                <div className="h-1 sm:h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 w-1/2" />
              </div>
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 space-y-1.5 sm:space-y-2">
                <div className="h-1 sm:h-1.5 rounded-full bg-slate-100 dark:bg-slate-700" />
                <div className="h-1 sm:h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 w-2/3" />
              </div>
            </div>
            <div className="absolute -top-3 -right-5 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-indigo-500/40"
                 style={{ animation: 'badge-float 3s ease-in-out infinite 0.8s' }}>
              DocuMind
            </div>
          </div>

          <div className="w-24 sm:w-36 h-3 rounded-full bg-indigo-400/30 dark:bg-indigo-500/20 blur-md mb-1 sm:mb-2 z-10"
               style={{ animation: tilt ? 'none' : 'shadow-pulse 5s ease-in-out infinite' }} />

          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mb-1 text-center max-w-xs leading-relaxed relative z-10 px-4">
            Upload a document to start analyzing, summarizing, and querying with AI.
          </p>
          <p className="text-[10px] sm:text-xs text-slate-400 dark:text-slate-500 mb-3 sm:mb-5 relative z-10">PDF, DOCX, XLSX, PPTX, TXT, PNG, JPG</p>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="relative z-10 inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {uploading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Uploading…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Upload your first document
              </>
            )}
          </button>

          <div className="flex items-center gap-3 mt-3 sm:mt-4 w-52 sm:w-64 relative z-10">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">or drag &amp; drop here</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>
        </div>
      )}

      {/* Analyze panel — shown after successful upload */}
      {uploadedFile && (
        <div className="flex-1 min-h-0 flex flex-col sm:flex-row gap-4 overflow-y-auto sm:overflow-hidden">

          {/* Left: file info + question + button */}
          <div className="w-full sm:w-80 shrink-0 flex flex-col gap-3">

            {/* Uploaded file card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4">
              <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide mb-2">Uploaded File</p>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 dark:text-white truncate">{uploadedFile.fileName}</p>
                  <p className="text-xs text-emerald-500 mt-0.5 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Ready to analyse
                  </p>
                </div>
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="mt-3 w-full text-xs text-slate-400 dark:text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors text-left"
              >
                ↑ Replace with another file
              </button>
            </div>

            {/* Question input */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wide">Your Question</label>
                <span className={`text-xs tabular-nums ${question.length > MAX_QUESTION ? 'text-red-500' : 'text-slate-400 dark:text-slate-500'}`}>
                  {question.length}/{MAX_QUESTION}
                </span>
              </div>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value.slice(0, MAX_QUESTION))}
                placeholder="e.g. Summarize this document"
                rows={3}
                className="w-full resize-none text-sm text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 dark:focus:border-indigo-400 transition"
              />
              {question.length === 0 && (
                <p className="text-xs text-slate-400 dark:text-slate-500">Ask anything about the document.</p>
              )}
            </div>

            {/* Analyse button */}
            <button
              onClick={handleAnalyze}
              disabled={!question.trim() || question.length > MAX_QUESTION || analyzing}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
            >
              {analyzing ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Analysing…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Analyse Document
                </>
              )}
            </button>
          </div>

          {/* Right: analysis result */}
          <div className="flex-1 min-w-0 min-h-64 sm:min-h-0 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2 shrink-0">
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Analysis Result</p>
            </div>

            {!analysis && !analyzing && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">No analysis yet</p>
                <p className="text-xs text-slate-400 dark:text-slate-500">Type a question and click &ldquo;Analyse Document&rdquo; to get started.</p>
              </div>
            )}

            {analyzing && !analysis && (
              <div className="flex-1 flex flex-col items-center justify-center gap-3">
                <svg className="w-8 h-8 animate-spin text-indigo-500" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                <p className="text-sm text-slate-500 dark:text-slate-400">Analysing your document…</p>
              </div>
            )}

            {analysis !== null && (
              <div className="flex-1 overflow-y-auto px-5 py-4">
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                  {analysis}
                  {analyzing && <span className="inline-block w-1.5 h-4 ml-0.5 bg-indigo-500 animate-pulse rounded-sm align-middle" />}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
