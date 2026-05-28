export type DocumentStatus = 'pending' | 'processing' | 'processed' | 'failed'

export type DocumentType = 'PDF' | 'DOCX' | 'XLSX' | 'PPTX' | 'PNG' | 'JPG' | 'TXT' | string

export interface Document {
  id: string
  name: string
  type: DocumentType
  size: number
  status: DocumentStatus
  pages?: number
  queryCount: number
  uploadedAt: string
  processedAt?: string
}

export interface DocumentUploadResponse {
  id: string
  name: string
  status: DocumentStatus
  uploadUrl?: string
}

export interface DocumentQuery {
  id: string
  documentId: string
  question: string
  answer: string
  createdAt: string
}
