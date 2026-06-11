import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { getClients } from '@/features/clients/api'
import type { Client } from '@/features/clients/types'
import { createProject, updateProject } from '../api'
import { PROJECT_STATUS_LABELS } from '../types'
import type { Project, CreateProjectDTO, ProjectStatus } from '../types'

interface Props {
  project?: Project
  onSuccess: () => void
  onCancel: () => void
}

export function ProjectForm({ project, onSuccess, onCancel }: Props) {
  const isEditing = !!project
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [clients, setClients] = useState<Client[]>([])
  const [form, setForm] = useState<CreateProjectDTO>({
    clientId: project?.clientId ?? '',
    name: project?.name ?? '',
    description: project?.description ?? '',
    status: project?.status ?? 'planning',
    startDate: project?.startDate?.slice(0, 10) ?? '',
    dueDate: project?.dueDate?.slice(0, 10) ?? '',
    estimatedValue: project?.estimatedValue ?? undefined,
  })

  useEffect(() => {
    getClients().then(setClients)
  }, [])

  function set<K extends keyof CreateProjectDTO>(field: K, value: CreateProjectDTO[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      if (isEditing) {
        await updateProject({ id: project.id, ...form })
      } else {
        await createProject(form)
      }
      onSuccess()
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Erro ao salvar projeto'
      console.error('createProject error:', msg)
      setError(msg)
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
            Nome <span className="text-red-500">*</span>
          </label>
          <input
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            required
            placeholder="Nome do projeto"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Cliente <span className="text-red-500">*</span>
          </label>
          <select
            value={form.clientId}
            onChange={(e) => set('clientId', e.target.value)}
            required
            className={inputClass}
          >
            <option value="">Selecione um cliente</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Descrição</label>
        <textarea
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          rows={3}
          placeholder="Descreva o projeto..."
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Status</label>
          <select
            value={form.status}
            onChange={(e) => set('status', e.target.value as ProjectStatus)}
            className={inputClass}
          >
            {Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Início</label>
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => set('startDate', e.target.value)}
            className={inputClass}
          />
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

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">Valor estimado (R$)</label>
        <input
          type="number"
          min={0}
          step={0.01}
          value={form.estimatedValue ?? ''}
          onChange={(e) => set('estimatedValue', e.target.value ? Number(e.target.value) : undefined)}
          placeholder="0,00"
          className={inputClass}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Salvando...' : isEditing ? 'Salvar alterações' : 'Criar projeto'}
        </Button>
      </div>
    </form>
  )
}
