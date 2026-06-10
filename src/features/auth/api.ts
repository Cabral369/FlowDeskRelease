import type { LoginCredentials, AuthUser } from './types'

// TODO: substituir pela chamada real à API ASP.NET Core
export async function login(credentials: LoginCredentials): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 800))

  if (credentials.email && credentials.password) {
    return {
      id: '1',
      name: 'Usuário Demo',
      email: credentials.email,
      token: 'mock-jwt-token',
    }
  }

  throw new Error('Credenciais inválidas')
}
