import serverless from 'serverless-http'
import express from 'express'

import { tasksRouter } from './tasks/tasks.router'
import { tasklistsRouter } from './tasklists/tasklists.router'

const app = express()

app.use(express.json())
// app.use('/', tasksRouter)
app.use('/tasks', tasksRouter)
app.use('/tasklists', tasklistsRouter)

app.use((req, res) => {
  console.log(req.method)
  console.log(req.path)
  console.log(req.params)
  return res.status(404).json({
    error: 'Not Found',
  })
})

export { app }
export const handler = serverless(app)
