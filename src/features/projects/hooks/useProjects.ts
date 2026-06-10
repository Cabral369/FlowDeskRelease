import { useState, useEffect } from 'react'
import { getProjects } from '../api'
import type { Project, ProjectStatus } from '../types'

export function useProjects(status?: ProjectStatus | 'all') {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getProjects({
        status: status === 'all' || !status ? undefined : status,
      })
      setProjects(data)
    } catch {
      setError('Erro ao carregar projetos.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { load() }, [status])

  return { projects, isLoading, error, refetch: load }
}
