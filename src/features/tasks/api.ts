import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from './types'
import { mockTasks } from './mock'

// TODO: substituir por chamadas reais à API ASP.NET Core (/api/tasks)
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms))

let store: Task[] = [...mockTasks]

export async function getTasks(projectId?: string): Promise<Task[]> {
  await delay()
  if (projectId) return store.filter((t) => t.projectId === projectId)
  return [...store]
}

export async function createTask(dto: CreateTaskDTO): Promise<Task> {
  await delay()
  const newTask: Task = {
    id: String(Date.now()),
    projectName: '',
    createdAt: new Date().toISOString(),
    ...dto,
  }
  store = [...store, newTask]
  return newTask
}

export async function updateTask({ id, ...dto }: UpdateTaskDTO): Promise<Task> {
  await delay()
  store = store.map((t) => (t.id === id ? { ...t, ...dto } : t))
  return { ...store.find((t) => t.id === id)! }
}

export async function updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
  return updateTask({ id, status })
}

export async function deleteTask(id: string): Promise<void> {
  await delay()
  store = store.filter((t) => t.id !== id)
}
