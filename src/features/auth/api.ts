import { http } from '@/lib/http'
import type { LoginCredentials, AuthUser } from './types'

export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  return http.post<AuthUser>('/Users/authenticate', credentials)
}

export async function refreshToken(token: string): Promise<AuthUser> {
  return http.post<AuthUser>('/Users/refresh-token', { refreshToken: token })
}
