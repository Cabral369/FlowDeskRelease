import { useState, useEffect } from 'react'
import { getClients } from '../api'
import type { Client } from '../types'

export function useClients() {
  const [clients, setClients] = useState<Client[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getClients()
      setClients(data)
    } catch {
      setError('Erro ao carregar clientes.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  return { clients, isLoading, error, refetch: load }
}
