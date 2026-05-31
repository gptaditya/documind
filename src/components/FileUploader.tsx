'use client'

import { useRef, useCallback } from 'react'
import { toast } from 'sonner'
import { uploadDocument } from '@/lib/api/documents'

const ACCEPTED = '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg,.jpeg'

export default function FileUploader() {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(async (files: File[]) => {
    if (!files.length) return

    for (const file of files) {
      const id = toast.loading(`Uploading ${file.name}…`)
      const result = await uploadDocument(file)
      if (result.success) {
        toast.success(`${file.name} uploaded successfully`, { id })
      } else {
        toast.error(result.error ?? 'Upload failed', { id, description: file.name })
      }
    }
  }, [])

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (files.length) handleFiles(files)
    e.target.value = ''
  }

  return (
    <>
      <input ref={inputRef} type="file" multiple accept={ACCEPTED} className="hidden" onChange={handleInputChange} />

      <button
        onClick={() => inputRef.current?.click()}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 rounded-lg transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload
      </button>
    </>
  )
}
