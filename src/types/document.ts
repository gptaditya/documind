export interface Document {
  s3Key: string
  fileName: string
  size: string
  lastModified: string
}

export interface DocumentUploadResponse {
  s3Key: string
  fileName: string
}

export interface DocumentAnalysisResponse {
  analysis: string
}

export interface DocumentQuery {
  id: string
  documentId: string
  question: string
  answer: string
  createdAt: string
}
