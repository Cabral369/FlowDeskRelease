import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../api'
import type { LoginCredentials } from '../types'

export function useLogin() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLogin(credentials: LoginCredentials) {
    setIsLoading(true)
    setError(null)
    try {
      const user = await login(credentials)
      // TODO: salvar token em contexto/store de autenticação
      localStorage.setItem('token', user.token)
      navigate('/dashboard')
    } catch {
      setError('E-mail ou senha incorretos.')
    } finally {
      setIsLoading(false)
    }
  }

  return { handleLogin, isLoading, error }
}
