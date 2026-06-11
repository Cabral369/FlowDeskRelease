import { Link } from 'react-router-dom'
import { Users, FolderKanban, CheckSquare, DollarSign, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useDashboardMetrics } from '@/features/dashboard/hooks/useDashboardMetrics'
import { PROJECT_STATUS_LABELS } from '@/features/projects/types'
import { TASK_PRIORITY_LABELS } from '@/features/tasks/types'
import type { TaskPriority } from '@/features/tasks/types'

const priorityVariant: Record<TaskPriority, 'destructive' | 'warning' | 'secondary'> = {
  critical: 'destructive',
  high: 'destructive',
  medium: 'warning',
  low: 'secondary',
}

export function DashboardPage() {
  const { metrics, recentProjects, upcomingTasks, isLoading } = useDashboardMetrics()

  const cards = [
    {
      label: 'Clientes',
      value: metrics?.totalClients ?? 0,
      icon: Users,
      color: 'bg-blue-50 text-blue-600',
    },
    {
      label: 'Projetos ativos',
      value: metrics?.activeProjects ?? 0,
      icon: FolderKanban,
      color: 'bg-violet-50 text-violet-600',
    },
    {
      label: 'Tarefas pendentes',
      value: metrics?.pendingTasks ?? 0,
      icon: CheckSquare,
      color: 'bg-amber-50 text-amber-600',
    },
    {
      label: 'Receita prevista',
      value: metrics
        ? metrics.expectedRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        : 'R$ 0,00',
      icon: DollarSign,
      color: 'bg-green-50 text-green-600',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Visão geral do seu workspace</p>
      </div>

      {/* Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">{label}</span>
              <div className={`p-2 rounded-lg ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            {isLoading ? (
              <div className="h-8 w-16 rounded bg-slate-100 animate-pulse" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{value}</p>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Projetos recentes */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Projetos recentes</h2>
            <Link
              to="/projects"
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 rounded bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : recentProjects.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-400">
              Nenhum projeto ainda.{' '}
              <Link to="/projects" className="text-blue-600 hover:underline">Criar projeto</Link>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recentProjects.map((project) => (
                <li key={project.id} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{project.name}</p>
                    {project.dueDate && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        Prazo: {new Date(project.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {PROJECT_STATUS_LABELS[project.status]}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tarefas próximas do prazo */}
        <div className="bg-white rounded-xl border border-slate-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-900">Tarefas próximas do prazo</h2>
            <Link
              to="/tasks"
              className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Ver todas <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {isLoading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-10 rounded bg-slate-100 animate-pulse" />
              ))}
            </div>
          ) : upcomingTasks.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-slate-400">
              Nenhuma tarefa com prazo próximo.
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {upcomingTasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-sm font-medium text-slate-800">{task.title}</p>
                    {task.dueDate && (
                      <p className="text-xs text-slate-400 mt-0.5">
                        Prazo: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                  <Badge variant={priorityVariant[task.priority]} className="text-xs">
                    {TASK_PRIORITY_LABELS[task.priority]}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
