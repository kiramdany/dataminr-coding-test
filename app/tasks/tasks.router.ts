import { Router } from 'express'
import { AddTaskDTO, UpdateTaskDTO } from '../model'
import {
  addTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from './tasks.service'

const router = Router()

router.get('/', (req, res, next) => {
  return getAllTasks()
    .then((tasks) => res.status(200).json(tasks))
    .catch((e) => next(e))
})
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  // Run this through a validator
  const taskId = parseInt(id)
  return getTask(taskId)
    .then((task) => res.status(200).json(task))
    .catch((e) => next(e))
})
router.post('/', (req, res, next) => {
  // Do this in a validator
  const { title, description, order } = req.body
  const addTaskDTO: AddTaskDTO = { title, description, order }

  return addTask(addTaskDTO)
    .then((tasks) => res.status(200).json(tasks))
    .catch((e) => next(e))
})
router.patch('/:id', (req, res, next) => {
  // Do this in a validator
  const { title, description, order, completed } = req.body
  const { id } = req.params
  const taskId = parseInt(id)
  const updateTaskDTO: UpdateTaskDTO = {
    id: taskId,
    title,
    description,
    order,
    completed,
  }

  return updateTask(updateTaskDTO)
    .then((tasks) => res.status(200).json(tasks))
    .catch((e) => next(e))
})
router.delete('/', (req, res, next) => {
  return deleteAllTasks()
    .then(() => {
      res.status(200).json()
    })
    .catch((e) => next(e))
})
router.delete('/:id', (req, res, next) => {
  // Do this in a validator
  const { id } = req.params
  const taskId = parseInt(id)

  return deleteTask(taskId)
    .then(() => res.status(200).end())
    .catch((e) => next(e))
})

export { router as tasksRouter }
