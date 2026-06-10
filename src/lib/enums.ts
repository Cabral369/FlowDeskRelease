// Mapeamento entre os enums do backend (inteiros) e as strings usadas no frontend

export const TaskStatusEnum = {
  todo: 1,
  in_progress: 2,
  review: 3,
  done: 4,
} as const

export const TaskStatusFromApi: Record<number, 'todo' | 'in_progress' | 'review' | 'done'> = {
  1: 'todo',
  2: 'in_progress',
  3: 'review',
  4: 'done',
}

export const TaskPriorityEnum = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
} as const

export const TaskPriorityFromApi: Record<number, 'low' | 'medium' | 'high' | 'critical'> = {
  1: 'low',
  2: 'medium',
  3: 'high',
  4: 'critical',
}

export const ProjectStatusEnum = {
  planning: 1,
  active: 2,
  paused: 3,
  completed: 4,
  cancelled: 5,
} as const

export const ProjectStatusFromApi: Record<number, 'planning' | 'active' | 'paused' | 'completed' | 'cancelled'> = {
  1: 'planning',
  2: 'active',
  3: 'paused',
  4: 'completed',
  5: 'cancelled',
}
