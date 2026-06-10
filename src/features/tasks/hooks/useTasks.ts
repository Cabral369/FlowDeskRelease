import { useState, useEffect } from 'react'
import { getTasks } from '../api'
import type { Task } from '../types'

export function useTasks(projectId?: string) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    setIsLoading(true)
    setError(null)
    try {
      const data = await getTasks({ projectId })
      setTasks(data)
    } catch {
      setError('Erro ao carregar tarefas.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => { load() }, [projectId])

  return { tasks, isLoading, error, refetch: load }
}
