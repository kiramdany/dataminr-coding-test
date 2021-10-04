import { Router } from 'express'
import { AddTasklistDTO } from '../model'
import {
  addTasklist,
  addTaskToTasklist,
  getAllTasklists,
  getTasklist,
  removeTaskFromTasklist,
} from './tasklists.service'

const router = Router()

router.get('/', (req, res, next) => {
  return getAllTasklists()
    .then((tasklists) => res.status(200).json(tasklists))
    .catch((e) => next(e))
})
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  // Run this through a validator
  const tasklistId = parseInt(id)
  return getTasklist(tasklistId)
    .then((tasklist) => res.status(200).json(tasklist))
    .catch((e) => next(e))
})
router.post('/', (req, res, next) => {
  // Do this in a validator
  const { title } = req.body
  const addTasklistDTO: AddTasklistDTO = { title }

  return addTasklist(addTasklistDTO)
    .then((tasklist) => res.status(201).json(tasklist))
    .catch((e) => next(e))
})
router.post('/:id/task-association', (req, res, next) => {
  const { id } = req.params
  const { taskId } = req.body
  // Run this through a validator
  const tasklistId = parseInt(id)
  return addTaskToTasklist({ tasklistId, taskId })
    .then((tasklist) => res.status(200).json(tasklist))
    .catch((e) => next(e))
})
router.delete('/:id/task-association/:taskId', (req, res, next) => {
  const { id, taskId } = req.params
  // Run this through a validator
  const tasklistId = parseInt(id)
  return removeTaskFromTasklist({ tasklistId, taskId: parseInt(taskId) })
    .then((tasklist) => res.status(200).json(tasklist))
    .catch((e) => next(e))
})

export { router as tasklistsRouter }
