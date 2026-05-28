export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  username: string
  email: string
  password: string
}

export interface User {
  id: string
  name: string
  email: string
  createdAt?: string
}

export interface AuthResponse {
  token: string
  user: User
}
