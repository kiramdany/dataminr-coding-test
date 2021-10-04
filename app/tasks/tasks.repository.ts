import { Pool } from 'pg'
import { AddTaskDTO, TaskEntity, UpdateTaskDTO } from '../model'

const pool = new Pool()

export const getAllTasksFromDB = async () => {
  const { rows: taskEntities } = await pool.query<TaskEntity>(
    'select * from task'
  )
  return taskEntities
}

export const getTaskFromDB = async (id: number) => {
  const {
    rows: [taskEntity],
  } = await pool.query<TaskEntity>('select * from task where id = $1', [id])
  return taskEntity
}

export const addTaskToDB = async ({
  title,
  description = '',
  order = null,
}: AddTaskDTO) => {
  const {
    rows: [taskEntity],
  } = await pool.query<TaskEntity>(
    `insert into task(title, description, "order") values($1, $2, $3) returning *`,
    [title, description, order]
  )
  return taskEntity
}

export const updateTaskInDB = async ({
  id,
  title = null,
  description = null,
  order = null,
  completed = null,
}: UpdateTaskDTO) => {
  const {
    rows: [taskEntity],
  } = await pool.query<TaskEntity>(
    `update task set title=coalesce($1, title), description=coalesce($2, description), "order"=coalesce($3, "order"), completed=coalesce($4,completed) where id=$5 returning *`,
    [title, description, order, completed, id]
  )
  return taskEntity
}

export const deleteAllTasksFromDB = async () => {
  const { rows: taskEntities } = await pool.query('delete from task')
  return taskEntities
}

export const deleteTaskFromDB = async (id: number) => {
  return pool.query<TaskEntity>('delete from task where id = $1', [id])
}
