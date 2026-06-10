import { Calendar, Trash2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TASK_PRIORITY_LABELS } from '../types'
import type { Task, TaskPriority } from '../types'

const priorityVariant: Record<TaskPriority, 'destructive' | 'warning' | 'secondary'> = {
  critical: 'destructive',
  high: 'destructive',
  medium: 'warning',
  low: 'secondary',
}

interface Props {
  task: Task
  onDelete: (id: string) => void
}

export function TaskCard({ task, onDelete }: Props) {
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('pt-BR')
    : null

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-3 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-medium text-slate-900 leading-snug">{task.title}</p>
        <Badge variant={priorityVariant[task.priority]} className="flex-shrink-0 text-xs">
          {TASK_PRIORITY_LABELS[task.priority]}
        </Badge>
      </div>

      <p className="text-xs text-slate-400 mb-3">{task.projectName}</p>

      <div className="flex items-center justify-between">
        {dueDate ? (
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Calendar className="w-3 h-3" />
            {dueDate}
          </span>
        ) : (
          <span />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-red-400 hover:text-red-600 hover:bg-red-50"
          onClick={() => onDelete(task.id)}
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  )
}
