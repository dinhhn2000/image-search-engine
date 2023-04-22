import express from 'express'
import multer from 'multer'
import fs from 'fs'
import * as Weviate from './weviate/weviate.js'
import path from 'path'

const router = express.Router()

const upload = multer()

router.post('/', upload.single('image'), async (req, res) => {
  const limit = parseInt(req.body.limit) || 3

  const fileData = req.file.buffer.toString('base64')
  const resImages = await Weviate.client.graphql.get()
    .withClassName(Weviate.className)
    .withFields(['image'])
    .withNearImage({ image: fileData })
    .withLimit(limit)
    .do()

  const directory = './results'

  // Create results directory
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory)
  }

  // Clear results directory
  const files = fs.readdirSync(directory)
  for (const file of files) fs.unlinkSync(path.join(directory, file))

  // Write result to filesystem
  resImages.data.Get[Weviate.className].map((result, index) => {
    fs.writeFileSync(`./results/result-${index}.jpg`, result.image, 'base64')
  })

  res.send('Done')
})

export default router
