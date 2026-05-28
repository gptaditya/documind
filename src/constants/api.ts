/**
 * Base URL of your backend server.
 * Set NEXT_PUBLIC_API_URL in .env.local to override.
 * Example: NEXT_PUBLIC_API_URL=http://localhost:8000
 */
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export const API_ENDPOINTS = {
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    me: '/api/auth/me',
    refresh: '/api/auth/refresh',
    google: '/api/auth/google',
  },
  documents: {
    list: '/api/documents',
    upload: '/api/documents/upload',
    get: (id: string) => `/api/documents/${id}`,
    delete: (id: string) => `/api/documents/${id}`,
    query: (id: string) => `/api/documents/${id}/query`,
  },
} as const
