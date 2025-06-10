const projectSchema = {
  name: {
    type: 'string',
    required: true
  },
  banner: {
    type: 'string',
    required: true
  },
  intro: {
    type: 'string',
    required: true
  },
  features: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        title: { type: 'string', required: true },
        description: { type: 'string', required: true }
      }
    }
  },
  platforms: {
    type: 'array',
    items: { type: 'string' }
  },
  colors: {
    type: 'array',
    items: { type: 'string' },
    minItems: 2,
    maxItems: 3
  },
  prototype: {
    type: 'string',
    required: true
  },
  phases: {
    type: 'array',
    items: { type: 'string' }
  },
  productImages: {
    type: 'array',
    items: { type: 'string' }
  },
  type: {
    type: 'string',
    enum: ['mobile', 'website'],
    required: true
  }
};

export default projectSchema; 