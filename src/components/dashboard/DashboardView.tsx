'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'sonner'
import { getUser } from '@/lib/auth/token'
import { fetchDocuments, uploadDocument } from '@/lib/api/documents'
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

  useEffect(() => {
    fetchDocuments().then((result) => {
      if (result.success) setDocs(result.data)
      setLoading(false)
    })
  }, [])

  const handleFiles = useCallback(async (files: File[]) => {
    if (!files.length) return
    setUploading(true)
    for (const file of files) {
      const id = toast.loading(`Uploading ${file.name}…`)
      const result = await uploadDocument(file)
      if (result.success) {
        toast.success(`${file.name} uploaded`, { id })
      } else {
        toast.error(result.error ?? 'Upload failed', { id, description: file.name })
        setUploading(false)
        return
      }
    }
    setUploading(false)
    const refreshed = await fetchDocuments()
    if (refreshed.success) setDocs(refreshed.data)
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    handleFiles(files)
    e.target.value = ''
  }

  // Drag-and-drop on the placeholder section only
  function onDragEnter(e: React.DragEvent) {
    e.preventDefault()
    dragCounter.current++
    setDropOver(true)
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
  }
  function onDragLeave() {
    dragCounter.current--
    if (dragCounter.current === 0) setDropOver(false)
  }
  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    dragCounter.current = 0
    setDropOver(false)
    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
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
      setTilt({
        rx: ((e.clientY - cy) / (r.height / 2)) * -10,
        ry: ((e.clientX - cx) / (r.width / 2)) * 10,
      })
    }
  }

  function handleMouseLeave() {
    mousePosRef.current = null
    setTilt(null)
  }

  const totalDocs = docs.length
  const processedToday = docs.filter((d) => {
    const uploaded = new Date(d.uploadedAt)
    return uploaded.toDateString() === new Date().toDateString() && d.status === 'processed'
  }).length
  const totalQueries = docs.reduce((sum, d) => sum + d.queryCount, 0)

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
      label: 'Processed Today',
      value: loading ? '—' : String(processedToday),
      color: 'emerald',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      label: 'AI Queries',
      value: loading ? '—' : String(totalQueries),
      color: 'violet',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="h-[calc(100vh-3.5rem)] flex flex-col px-6 lg:px-8 py-5 overflow-hidden">

      {/* Header */}
      <div className="mb-4 shrink-0">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {greeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-0.5 text-sm">Here&apos;s what&apos;s happening with your documents today.</p>
      </div>

      {/* Upload placeholder — fills remaining height */}
      {!loading && docs.length === 0 && (
        <>
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

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg"
            className="hidden"
            onChange={handleInputChange}
          />

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
            {/* Physics dot grid */}
            <DotGrid mouseRef={mousePosRef} />

            {/* Drop overlay — centered over the whole section */}
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
              <div className="absolute inset-0 w-44 h-56 rounded-2xl bg-indigo-300/40 dark:bg-indigo-800/40"
                   style={{ transform: 'translateX(14px) translateY(14px) rotate(8deg)', filter: 'blur(1px)' }} />
              <div className="absolute inset-0 w-44 h-56 rounded-2xl bg-indigo-200/60 dark:bg-indigo-700/50"
                   style={{ transform: 'translateX(7px) translateY(7px) rotate(4deg)' }} />
              <div className="relative w-44 h-56 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center justify-center gap-4 overflow-hidden">
                {tilt && (
                  <div className="absolute inset-0 rounded-2xl pointer-events-none"
                       style={{ background: `radial-gradient(ellipse at ${50 + tilt.ry * 1.5}% ${50 + tilt.rx * 1.5}%, rgba(255,255,255,0.18), transparent 70%)` }} />
                )}
                <div className="absolute top-5 left-5 right-5 space-y-2">
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 w-3/4" />
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 w-1/2" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-indigo-600 dark:bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/40">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="absolute bottom-5 left-5 right-5 space-y-2">
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700" />
                  <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-700 w-2/3" />
                </div>
              </div>
              <div className="absolute -top-3 -right-5 bg-indigo-600 dark:bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-indigo-500/40"
                   style={{ animation: 'badge-float 3s ease-in-out infinite 0.8s' }}>
                AI Ready
              </div>
            </div>

            <div className="w-36 h-3 rounded-full bg-indigo-400/30 dark:bg-indigo-500/20 blur-md mb-10 z-10"
                 style={{ animation: tilt ? 'none' : 'shadow-pulse 5s ease-in-out infinite' }} />

            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2 relative z-10">No documents yet</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 text-center max-w-xs leading-relaxed relative z-10">
              Upload a document to start analyzing, summarizing, and querying with AI.
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mb-7 relative z-10">
              PDF, DOCX, XLSX, PPTX, TXT, PNG, JPG
            </p>

            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="relative z-10 inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
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

            <div className="flex items-center gap-3 mt-5 w-64 relative z-10">
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
              <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">or drag &amp; drop here</span>
              <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            </div>
          </div>
        </>
      )}
    </div>
  )
}
