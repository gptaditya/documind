import { API_BASE_URL, API_ENDPOINTS } from '@/constants/api'
import { getToken } from '@/lib/auth/token'
import type { Document, DocumentUploadResponse } from '@/types/document'
import type { ApiResult } from '@/types/api'

function authHeaders(): HeadersInit {
  const token = getToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function fetchDocuments(): Promise<ApiResult<Document[]>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.documents.list}`, {
      headers: authHeaders(),
    })
    const json = await res.json()
    if (!res.ok) return { success: false, error: json.message ?? 'Failed to load documents.' }
    // Handle both array response and wrapped { data/documents/files: [...] }
    const list: Document[] = Array.isArray(json)
      ? json
      : Array.isArray(json.data) ? json.data
      : Array.isArray(json.documents) ? json.documents
      : Array.isArray(json.files) ? json.files
      : []
    return { success: true, data: list }
  } catch {
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}

export async function uploadDocument(file: File): Promise<ApiResult<DocumentUploadResponse>> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.documents.upload}`, {
      method: 'POST',
      headers: authHeaders(),
      body: formData,
    })
    const json = await res.json()
    if (!res.ok) return { success: false, error: json.message ?? 'Upload failed.' }
    return { success: true, data: json as DocumentUploadResponse }
  } catch {
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}

export async function analyzeDocument(
  s3Key: string,
  question: string,
  onChunk: (chunk: string) => void,
): Promise<ApiResult<void>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.documents.analyze}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeaders() as Record<string, string> },
      body: JSON.stringify({ s3Key, question }),
    })
    if (!res.ok) {
      const json = await res.json().catch(() => ({}))
      return { success: false, error: json.message ?? 'Analysis failed.' }
    }
    if (!res.body) return { success: false, error: 'No response body.' }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const raw = decoder.decode(value, { stream: true })
      // Parse SSE lines: each line is "data:<chunk>" or "data: <chunk>"
      for (const line of raw.split('\n')) {
        if (line.startsWith('data:')) {
          onChunk(line.slice(5)) // preserve leading space (word boundary)
        }
      }
    }
    return { success: true, data: undefined }
  } catch {
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}

export async function deleteDocument(id: string): Promise<ApiResult<void>> {
  try {
    const res = await fetch(`${API_BASE_URL}${API_ENDPOINTS.documents.delete(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    })
    if (!res.ok) {
      const json = await res.json()
      return { success: false, error: json.message ?? 'Failed to delete document.' }
    }
    return { success: true, data: undefined }
  } catch {
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}
