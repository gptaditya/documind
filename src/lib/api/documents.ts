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
    return { success: true, data: json }
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
