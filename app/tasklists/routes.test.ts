import supertest from 'supertest'
import { app } from '../app'
import { pool } from './tasklists.repository'

const server = supertest(app)

describe('tasklists', () => {
  let taskId
  afterAll(async () => {
    await pool.end()
  })
  it('creates new tasklist', () =>
    server
      .post('/tasklists')
      .send({ title: 'tasklist' })
      .expect(({ body }) =>
        expect(body).toMatchObject({
          id: 1,
          title: 'tasklist',
          updated_at: expect.anything(),
        })
      ))
  it('GETs all tasklists', () =>
    server.get('/tasklists').expect(({ body }) =>
      expect(body).toMatchObject([
        {
          id: 1,
          title: 'tasklist',
          updated_at: expect.anything(),
        },
      ])
    ))
  it('adds task to tasklist', async () => {
    ;({
      body: { id: taskId },
    } = await server.post('/tasks').send({ title: 'test task' }))
    return server
      .post('/tasklists/1/task-association')
      .send({ taskId })
      .expect(({ body }) =>
        expect(body).toMatchObject({
          id: 1,
          title: 'tasklist',
          tasks: [
            {
              id: 1,
              title: 'test task',
              description: '',
              order: null,
              completed: false,
            },
          ],
          updated_at: expect.anything(),
        })
      )
  })
  it('GETs a tasklist and its tasks', () =>
    server.get('/tasklists/1').expect(({ body }) =>
      expect(body).toMatchObject({
        id: 1,
        title: 'tasklist',
        tasks: [
          {
            id: 1,
            title: 'test task',
            description: '',
            order: null,
            completed: false,
          },
        ],
        updated_at: expect.anything(),
      })
    ))
  it('removes task from tasklist', () =>
    server.delete('/tasklists/1/task-association/1').expect(({ body }) =>
      expect(body).toMatchObject({
        id: 1,
        title: 'tasklist',
        updated_at: expect.anything(),
        tasks: [],
      })
    ))
})
