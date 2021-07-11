const { ObjectId } = require('mongodb')

async function routes(fastify) {
  // custom plugin for connecting to mongodb
  const { db } = fastify.mongo

  fastify.get('/', async function (request, reply) {
    // fastify-mongodb
    // const { db } = this.mongo
    try {
      const collection = await db.collection('test')
      const result = await collection.find().toArray()
      reply.send(result)
    } catch (err) {
      fastify.log.error(err)
    }
  })
  fastify.get('/:id', async function (request, reply) {
    // fastify-mongodb
    // const { db } = this.mongo
    const { id } = request.params
    try {
      const collection = await db.collection('test')
      const result = await collection.findOne({ _id: ObjectId(id) })
      reply.send(result)
    } catch (err) {
      fastify.log.error(err)
    }
  })
}

module.exports = routes
