import type { Project, ProjectStatus } from '@/types'

export type { Project, ProjectStatus }

export interface CreateProjectDTO {
  clientId: string
  name: string
  description?: string
  status?: ProjectStatus
  startDate?: string
  dueDate?: string
  estimatedValue?: number
}

export interface UpdateProjectDTO extends Partial<CreateProjectDTO> {
  id: string
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planejamento',
  active: 'Em andamento',
  paused: 'Pausado',
  completed: 'Concluído',
  cancelled: 'Cancelado',
}
