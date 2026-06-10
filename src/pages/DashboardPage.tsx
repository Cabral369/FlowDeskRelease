import { Users, FolderKanban, CheckSquare, DollarSign } from 'lucide-react'
import { useDashboardMetrics } from '@/features/dashboard/hooks/useDashboardMetrics'

export function DashboardPage() {
  const { metrics, isLoading } = useDashboardMetrics()

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
    </div>
  )
}
