export const ImageSchema = {
  class: 'image_to_vector_schema',
  vectorizer: 'img2vec-neural',
  vectorIndexType: 'hnsw',  // Hierarchical Navigable Small Worlds
  moduleConfig: {
    'img2vec-neural': {
      imageFields: ['image']
    }
  },
  properties: [
    { name: 'image', dataType: ['blob'] },
    { name: 'text', dataType: ['string'] }
  ]
}