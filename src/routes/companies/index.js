async function routes(fastify) {
  fastify.post(
    '/',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            displayName: { type: 'string' },
            description: { type: 'string' },
            foundedAt: { type: 'string' },
            nifNum: { type: 'string' },
            statNum: { type: 'string' },
          },
          required: ['displayName', 'foundedAt', 'nifNum', 'statNum'],
        },
      },
    },
    async function (request, reply) {
      const { db } = this.mongo
      const { displayName, description, foundedAt, nifNum, statNum } =
        request.body

      try {
        const collection = await db.collection('companies')
        const data = await collection.insertOne({
          description,
          displayName,
          foundedAt: new Date(foundedAt),
          nifNum,
          statNum,
        })
        reply.send({ opsStatus: data.result, data: data.ops })
      } catch (err) {
        fastify.log.error(err)
      }
    }
  )
}

module.exports = routes
