import { useState } from 'react'
import { Plus, FolderKanban } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { ProjectForm } from '@/features/projects/components/ProjectForm'
import { useProjects } from '@/features/projects/hooks/useProjects'
import { deleteProject } from '@/features/projects/api'
import { PROJECT_STATUS_LABELS } from '@/features/projects/types'
import type { Project, ProjectStatus } from '@/features/projects/types'

type Filter = 'all' | ProjectStatus

const filters: { label: string; value: Filter }[] = [
  { label: 'Todos', value: 'all' },
  ...Object.entries(PROJECT_STATUS_LABELS).map(([value, label]) => ({
    label,
    value: value as ProjectStatus,
  })),
]

export function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const { projects, isLoading, refetch } = useProjects(activeFilter)
  const [editing, setEditing] = useState<Project | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)

  async function handleDelete(id: string) {
    await deleteProject(id)
    refetch()
  }

  function openEdit(project: Project) {
    setEditing(project)
    setIsFormOpen(true)
  }

  function openCreate() {
    setEditing(null)
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
          <h1 className="text-2xl font-bold text-slate-900">Projetos</h1>
          <p className="text-slate-500 text-sm mt-1">Acompanhe o andamento dos seus projetos</p>
        </div>
        <Button onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Novo projeto
        </Button>
      </div>

      {isFormOpen && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-4">
            {editing ? 'Editar projeto' : 'Novo projeto'}
          </h2>
          <ProjectForm project={editing ?? undefined} onSuccess={onFormSuccess} onCancel={closeForm} />
        </div>
      )}

      <div className="flex items-center gap-2 flex-wrap">
        {filters.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setActiveFilter(value)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              activeFilter === value
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 text-center py-16 text-slate-400 text-sm">
          <FolderKanban className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium text-slate-500">Nenhum projeto encontrado</p>
          <p className="mt-1">Clique em "Novo projeto" para criar o primeiro.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}
