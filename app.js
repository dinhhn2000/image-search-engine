import express from 'express'
import uploadHandlers from './upload-handlers.js'
import * as Weviate from './weviate/weviate.js'


const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/search', uploadHandlers)
app.get('/setup-schema', (_req, res) => Weviate.setupSchema(res))
app.get('/schema', async (_req, res) => await Weviate.getSchemas(res))
app.get('/dump-database', (_req, res) => Weviate.saveImages(res))

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
