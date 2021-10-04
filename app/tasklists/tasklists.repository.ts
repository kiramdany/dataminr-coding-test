import { Pool } from 'pg'
import { AddTasklistDTO, TasklistEntity } from '../model'

export const pool = new Pool()

export const getAllTasklistsFromDB = async () => {
  const { rows: tasklistEntities } = await pool.query<TasklistEntity>(
    'select * from tasklist'
  )
  return tasklistEntities
}

export const getTasklistFromDB = async (id: number) => {
  const {
    rows: [tasklistEntity],
  } = await pool.query<TasklistEntity>(
    `select * from tasklist where tasklist.id = $1`,
    [id]
  )
  return tasklistEntity
}

export const getTasklistTasks = async (id: number) => {
  const { rows: taskEntities } = await pool.query<TasklistEntity>(
    `select * from task_tasklist join task on task_tasklist.task_id = task.id where task_tasklist.tasklist_id = $1`,
    [id]
  )
  return taskEntities
}

export const addTasklistToDB = async ({ title }: AddTasklistDTO) => {
  const {
    rows: [tasklistEntity],
  } = await pool.query<TasklistEntity>(
    `insert into tasklist(title) values($1) returning *`,
    [title]
  )
  return tasklistEntity
}

export const addTaskToTasklistInDB = async ({ tasklistId, taskId }) => {
  const {
    rows: [tasklistEntity],
  } = await pool.query<TasklistEntity>(
    `insert into task_tasklist(tasklist_id, task_id) values($1, $2) returning *`,
    [tasklistId, taskId]
  )
  return tasklistEntity
}
export const removeTaskInTasklistInDB = async ({ tasklistId, taskId }) => {
  const {
    rows: [tasklistEntity],
  } = await pool.query<TasklistEntity>(
    `delete from task_tasklist where (tasklist_id, task_id) = ($1, $2)`,
    [tasklistId, taskId]
  )
  return tasklistEntity
}
