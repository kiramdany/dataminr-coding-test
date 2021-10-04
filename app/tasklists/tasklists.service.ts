import {
  addTasklistToDB,
  addTaskToTasklistInDB,
  getAllTasklistsFromDB,
  getTasklistFromDB,
  getTasklistTasks,
  removeTaskInTasklistInDB,
} from './tasklists.repository'

import {
  AddTasklistDTO,
  AddTaskToTasklistDTO,
  RemoveTaskInTasklistDTO,
  Tasklist,
} from '../model'
import { generateTask } from '../tasks/tasks.service'

export const getAllTasklists = async () => {
  const tasklistEntities = await getAllTasklistsFromDB()
  return tasklistEntities
}

export const getTasklist = async (id: number): Promise<Tasklist> => {
  const tasklistEntity = await getTasklistFromDB(id)
  const tasksEntities = await getTasklistTasks(id)

  return { ...tasklistEntity, tasks: tasksEntities.map(generateTask) || [] }
}

export const addTasklist = async (addTasklistRequest: AddTasklistDTO) => {
  const tasklistEntity = await addTasklistToDB(addTasklistRequest)
  return tasklistEntity
}
export const addTaskToTasklist = async (
  addTaskToTaslistkRequest: AddTaskToTasklistDTO
) => {
  await addTaskToTasklistInDB(addTaskToTaslistkRequest)
  return getTasklist(addTaskToTaslistkRequest.tasklistId)
}
export const removeTaskFromTasklist = async (
  removeTasklistInTaskRequest: RemoveTaskInTasklistDTO
) => {
  await removeTaskInTasklistInDB(removeTasklistInTaskRequest)
  return getTasklist(removeTasklistInTaskRequest.tasklistId)
}
