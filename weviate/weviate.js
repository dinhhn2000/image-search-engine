import Weaviate from 'weaviate-ts-client'
import fs from 'fs'
import path from 'path'
import { ImageSchema } from './schema.js'

export const className = 'Dimage'

export const client = Weaviate.client({
  scheme: 'http',
  host: 'localhost:8080'
})

export async function getSchemas() {
  return (await client.schema.getter().do())
}

export async function setupSchema() {
  await client.schema.classCreator().withClass(ImageSchema).do()
}

export async function saveImages(_req, res) {
  const images = readImages()
  for (const image of images) {
    const properties = image
    const result = await client.data.creator()
      .withClassName(className)
      .withProperties(properties)
      .do()
    console.log(result.id)
  }

  res.send('Done')
}

const readImages = () => {
  const getBase64Data = (filePath) => {
    const data = fs.readFileSync(filePath)
    return data.toString('base64')
  }

  const folderPath = process.cwd() + '/data'

  const fileNames = fs.readdirSync(folderPath)
  const imageInfo = fileNames.map((fileName) => {
    const filePath = path.join(folderPath, fileName)
    const base64Data = getBase64Data(filePath)
    return { text: fileName, image: base64Data }
  })
  return imageInfo
}


