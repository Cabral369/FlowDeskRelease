import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getClients } from '@/features/clients/api'
import { getProjects } from '@/features/projects/api'
import { getTasks } from '@/features/tasks/api'
import type { Project } from '@/features/projects/types'
import type { Task } from '@/features/tasks/types'

export interface DashboardMetrics {
  totalClients: number
  activeProjects: number
  pendingTasks: number
  expectedRevenue: number
}

export function useDashboardMetrics() {
  const location = useLocation()
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null)
  const [recentProjects, setRecentProjects] = useState<Project[]>([])
  const [upcomingTasks, setUpcomingTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setIsLoading(true)
      try {
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
            .filter((p) => p.status === 'active' || p.status === 'completed')
            .reduce((sum, p) => sum + (p.estimatedValue ?? 0), 0),
        })

        // 5 projetos mais recentes (por createdAt desc)
        const sorted = [...projects].sort((a, b) => {
          const da = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const db = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return db - da
        })
        setRecentProjects(sorted.slice(0, 5))

        // Tarefas não concluídas com prazo, ordenadas por dueDate
        const upcoming = tasks
          .filter((t) => t.status !== 'done' && t.dueDate)
          .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
          .slice(0, 5)
        setUpcomingTasks(upcoming)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [location.pathname])

  return { metrics, recentProjects, upcomingTasks, isLoading }
}
