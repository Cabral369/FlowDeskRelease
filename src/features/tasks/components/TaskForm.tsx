import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getProjects } from '@/features/projects/api'
import type { Project } from '@/features/projects/types'
import { createTask, updateTask } from '../api'
import { TASK_STATUS_LABELS, TASK_PRIORITY_LABELS } from '../types'
import type { Task, CreateTaskDTO, TaskStatus, TaskPriority } from '../types'

interface Props {
  task?: Task
  defaultProjectId?: string
  onSuccess: () => void
  onCancel: () => void
}

export function TaskForm({ task, defaultProjectId, onSuccess, onCancel }: Props) {
  const isEditing = !!task
  const [isLoading, setIsLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [form, setForm] = useState<CreateTaskDTO>({
    projectId: task?.projectId ?? defaultProjectId ?? '',
    title: task?.title ?? '',
    description: task?.description ?? '',
    status: task?.status ?? 'todo',
    priority: task?.priority ?? 'medium',
    dueDate: task?.dueDate?.slice(0, 10) ?? '',
  })

  useEffect(() => {
    getProjects().then(setProjects)
  }, [])

  function set<K extends keyof CreateTaskDTO>(field: K, value: CreateTaskDTO[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const dto = { ...form, dueDate: form.dueDate || undefined, description: form.description || undefined }
      if (isEditing) {
        await updateTask({ id: task.id, ...dto })
      } else {
        await createTask(dto)
      }
      onSuccess()
    } finally {
      setIsLoading(false)
    }
  }

  const inputClass = 'w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            required
            placeholder="Nome da tarefa"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Projeto <span className="text-red-500">*</span>
          </label>
          <select
            value={form.projectId}
            onChange={(e) => set('projectId', e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Selecione um projeto</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={2}
          placeholder="Detalhes da tarefa..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
          <select
            value={form.status}
            onChange={(e) => set('status', e.target.value as TaskStatus)}
            className={inputClass}
          >
            {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Prioridade</label>
          <select
            value={form.priority}
            onChange={(e) => set('priority', e.target.value as TaskPriority)}
            className={inputClass}
          >
            {Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Prazo</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => set('dueDate', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancelar</Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar tarefa'}
        </Button>
      </div>
    </form>
  )
}
