import express from 'express'
import uploadHandlers from './upload-handlers.js'
import * as Weviate from './weviate/weviate.js'


const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/search', uploadHandlers)
app.get('/setup-schema', () => Weviate.setupSchema())
app.get('/schema', async (_req, res) => res.json(await Weviate.getSchemas()))
app.get('/dump-database', () => Weviate.saveImages())

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
