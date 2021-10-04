type Timestamp = string

export type TaskEntity = {
  id: number
  title: string
  description: string
  completed: boolean
  updated_at: Timestamp
  order: number
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
