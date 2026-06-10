import { useState, useEffect } from 'react'
import { getClients } from '@/features/clients/api'
import { getProjects } from '@/features/projects/api'
import { getTasks } from '@/features/tasks/api'

export interface DashboardMetrics {
  totalClients: number
  activeProjects: number
  pendingTasks: number
  expectedRevenue: number
}

export function useDashboardMetrics() {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      const [clients, projects, tasks] = await Promise.all([
        getClients(),
        getProjects(),
        getTasks(),
      ])
      setMetrics({
        totalClients: clients.length,
        activeProjects: projects.filter((p) => p.status === 'active').length,
        pendingTasks: tasks.filter((t) => t.status !== 'done').length,
        expectedRevenue: projects
          .filter((p) => p.status === 'active')
          .reduce((sum, p) => sum + (p.estimatedValue ?? 0), 0),
      })
      setIsLoading(false)
    }
    load()
  }, [])

  return { metrics, isLoading }
}
