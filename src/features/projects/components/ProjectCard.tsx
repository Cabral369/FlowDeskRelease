import { Calendar, DollarSign, Pencil, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PROJECT_STATUS_LABELS } from '../types'
import type { Project, ProjectStatus } from '../types'

const statusVariant: Record<ProjectStatus, 'default' | 'success' | 'secondary' | 'destructive'> = {
  planning: 'secondary',
  active: 'default',
  completed: 'success',
  paused: 'secondary',
  cancelled: 'destructive',
}

interface Props {
  project: Project
  onEdit: (project: Project) => void
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onEdit, onDelete }: Props) {
  const formatted = project.estimatedValue
    ? project.estimatedValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : null

  const dueDate = project.dueDate
    ? new Date(project.dueDate).toLocaleDateString('pt-BR')
    : null

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 flex flex-col gap-3 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug">{project.name}</h3>
        <Badge variant={statusVariant[project.status]} className="flex-shrink-0">
          {PROJECT_STATUS_LABELS[project.status]}
        </Badge>
      </div>

      <p className="text-xs text-slate-500">Cliente: {project.clientName || '—'}</p>

      <div className="flex items-center gap-4 text-xs text-slate-400">
        {dueDate && (
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {dueDate}
          </span>
        )}
        {formatted && (
          <span className="flex items-center gap-1">
            <DollarSign className="w-3 h-3" />
            {formatted}
          </span>
        )}
      </div>

      <div className="flex items-center justify-end gap-1 pt-1 border-t border-slate-100">
        <Button variant="ghost" size="icon" onClick={() => onEdit(project)}>
          <Pencil className="w-3.5 h-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </div>
  )
}
