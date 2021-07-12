const { ObjectId } = require('mongodb')

const POST_SCHEMA_VALIDATION = {
  schema: {
    body: {
      type: 'object',
      properties: {
        foo: { type: 'string' },
        baz: { type: 'number' },
      },
      required: ['baz'],
    },
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },
}

async function routes(fastify) {
  // root
  fastify.get('/', async function (request, reply) {
    const { db } = this.mongo
    try {
      const collection = await db.collection('test')
      const result = await collection.find().toArray()
      reply.send({ name: 'from test database', result })
    } catch (err) {
      fastify.log.error(err)
    }
  })
  fastify.post('/', POST_SCHEMA_VALIDATION, async function () {
    return { post: 'example of post request' }
  })

  // search
  fastify.get('/search/:id', async function (request, reply) {
    const { db } = this.mongo
    const { id } = request.params
    try {
      const collection = await db.collection('test')
      const result = await collection.findOne({ _id: ObjectId(id) })
      reply.send({ name: 'from test database', result })
    } catch (err) {
      fastify.log.error(err)
    }
  })
}

module.exports = routes
