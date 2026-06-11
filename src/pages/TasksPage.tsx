import { useState } from 'react'
import { Plus, CheckSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TaskCard } from '@/features/tasks/components/TaskCard'
import { TaskForm } from '@/features/tasks/components/TaskForm'
import { useTasks } from '@/features/tasks/hooks/useTasks'
import { deleteTask } from '@/features/tasks/api'
import { TASK_STATUS_LABELS } from '@/features/tasks/types'
import type { Task, TaskStatus } from '@/features/tasks/types'

const columns: { status: TaskStatus; variant: 'secondary' | 'default' | 'warning' | 'success' }[] = [
  { status: 'todo', variant: 'secondary' },
  { status: 'in_progress', variant: 'default' },
  { status: 'review', variant: 'warning' },
  { status: 'done', variant: 'success' },
]

export function TasksPage() {
  const { tasks, isLoading, refetch } = useTasks()
  const [editing, setEditing] = useState<Task | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  async function handleDelete(id: string) {
    await deleteTask(id)
    refetch()
  }

  function openCreate() {
    setEditing(null)
    setIsFormOpen(true)
  }

  function openEdit(task: Task) {
    setEditing(task)
    setIsFormOpen(true)
  }

  function closeForm() {
    setIsFormOpen(false)
    setEditing(null)
  }

  function onFormSuccess() {
    closeForm()
    refetch()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Tarefas</h1>
          <p className="text-slate-500 text-sm mt-1">Organize as atividades dos seus projetos</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Nova tarefa
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            {editing ? 'Editar tarefa' : 'Nova tarefa'}
          </h2>
          <TaskForm task={editing ?? undefined} onSuccess={onFormSuccess} onCancel={closeForm} />
        </div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {columns.map(({ status, variant }) => {
            const columnTasks = tasks.filter((t) => t.status === status)
            return (
              <div key={status} className="bg-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-slate-700">
                    {TASK_STATUS_LABELS[status]}
                  </h2>
                  <Badge variant={variant}>{columnTasks.length}</Badge>
                </div>
                <div className="space-y-3">
                  {columnTasks.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      <CheckSquare className="w-6 h-6 mx-auto mb-2 opacity-30" />
                      <p>Sem tarefas</p>
                    </div>
                  ) : (
                    columnTasks.map((task) => (
                      <TaskCard key={task.id} task={task} onEdit={openEdit} onDelete={handleDelete} />
                    ))
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
