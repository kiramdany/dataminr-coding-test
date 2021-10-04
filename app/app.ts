import serverless from 'serverless-http'
import express from 'express'

import {
  addTask,
  deleteAllTasks,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from './service'
import { AddTaskDTO, UpdateTaskDTO } from './model'

const app = express()

app.use(express.json())

app.get('/', (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  console.log(req.body)
  return getAllTasks()
    .then((tasks) => {
      console.log(tasks)
      res.status(200).json(tasks)
    })
    .catch((e) => next(e))
})
app.get('/:id', (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  console.log(req.body)

  const { id } = req.params
  // Run this through a validator
  const taskId = parseInt(id)
  return getTask(taskId)
    .then((task) => {
      console.log(task)
      res.status(200).json(task)
    })
    .catch((e) => next(e))
})
app.post('/', (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  console.log(req.body)
  // Do this in a validator
  const { title, description, order } = req.body
  const addTaskDTO: AddTaskDTO = { title, description, order }

  return addTask(addTaskDTO)
    .then((tasks) => {
      console.log(tasks)
      res.status(200).json(tasks)
    })
    .catch((e) => next(e))
})
app.patch('/:id', (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  console.log(req.body)
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
    .then((tasks) => {
      console.log(tasks)
      res.status(200).json(tasks)
    })
    .catch((e) => next(e))
})
app.delete('/', (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  console.log(req.body)
  return deleteAllTasks()
    .then(() => {
      res.status(200).json()
    })
    .catch((e) => next(e))
})
app.delete('/:id', (req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  console.log(req.body)
  // Do this in a validator
  const { id } = req.params
  const taskId = parseInt(id)

  return deleteTask(taskId)
    .then(() => {
      res.status(200).end()
    })
    .catch((e) => next(e))
})

app.use((req, res, next) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  return res.status(404).json({
    error: 'Not Found',
  })
})

export const handler = serverless(app)
