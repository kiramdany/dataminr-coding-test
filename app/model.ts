type Timestamp = string

export type TaskEntity = {
  id: number
  title: string
  description: string
  completed: boolean
  updated_at: Timestamp
  order: number | null
}

export type Task = TaskEntity & {
  url: string
}

export type AddTaskDTO = {
  title: string
  description?: string
  order?: number
}
export type UpdateTaskDTO = {
  id: number
  title?: string
  description?: string
  order?: number
  completed?: boolean
}

export type TasklistEntity = {
  id: number
  title: string
}

export type Tasklist = {
  id: number
  title: string
  tasks: Task[]
}

export type AddTasklistDTO = {
  title: string
}
export type AddTaskToTasklistDTO = {
  tasklistId: number
  taskId: number
}
export type RemoveTaskInTasklistDTO = {
  tasklistId: number
  taskId: number
}
