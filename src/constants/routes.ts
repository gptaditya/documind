export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  authCallback: '/auth/callback',
  dashboard: '/dashboard',
  documents: '/dashboard/documents',
  upload: '/dashboard/upload',
  settings: '/dashboard/settings',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
