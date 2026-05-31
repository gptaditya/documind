import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth'
import type { ApiResult } from '@/types/api'
import { API_BASE_URL } from '@/constants/api'

export async function loginUser(data: LoginRequest): Promise<ApiResult<AuthResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: json.message ?? 'Invalid email or password.',
        statusCode: res.status,
      }
    }

    return { success: true, data: json }
  } catch {
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}

export async function registerUser(data: RegisterRequest): Promise<ApiResult<AuthResponse>> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    const json = await res.json()

    if (!res.ok) {
      return {
        success: false,
        error: json.message ?? 'Registration failed. Please try again.',
        statusCode: res.status,
      }
    }

    return { success: true, data: json }
  } catch {
    return { success: false, error: 'Network error. Please check your connection.' }
  }
}


export async function logoutUser(): Promise<void> {
  try {
    await fetch('/api/auth/logout', { method: 'POST' })
  } catch {
    // Ignore — client-side token removal is the source of truth
  }
}