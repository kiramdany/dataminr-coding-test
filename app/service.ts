import {
  addTaskToDB,
  deleteTaskFromDB,
  deleteAllTasksFromDB,
  getAllTasksFromDB,
  getTaskFromDB,
  updateTaskInDB,
} from './repository'

import { AddTaskDTO, Task, TaskEntity, UpdateTaskDTO } from './model'

const generateTask = (taskEntity: TaskEntity): Task => {
  const baseUrl = 'http://localhost:3000/'
  return { ...taskEntity, url: baseUrl + taskEntity.id }
}

export const getAllTasks = async () => {
  const taskEntities = await getAllTasksFromDB()
  return taskEntities.map(generateTask)
}

export const getTask = async (id: number) => {
  const taskEntity = await getTaskFromDB(id)
  return generateTask(taskEntity)
}

export const addTask = async (addTaskRequest: AddTaskDTO) => {
  const taskEntity = await addTaskToDB(addTaskRequest)
  return generateTask(taskEntity)
}

export const updateTask = async (updateTakeRequest: UpdateTaskDTO) => {
  const taskEntity = await updateTaskInDB(updateTakeRequest)
  return generateTask(taskEntity)
}

export const deleteAllTasks = async () => {
  return deleteAllTasksFromDB()
}

export const deleteTask = async (id: number) => {
  return deleteTaskFromDB(id)
}
