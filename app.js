import express from 'express'
import uploadHandlers from './upload-handlers.js'


const app = express()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/search', uploadHandlers)

app.listen(3000, () => {
  console.log('Server started on port 3000')
})
