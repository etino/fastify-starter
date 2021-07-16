import { FastifyPluginAsync } from 'fastify'

interface Body {
  displayName: string
  foundedAt: string
  nifNum: string
  statNum: string
  description?: string
}

const bodyJsonSchema = {
  type: 'object',
  required: ['displayName', 'foundedAt', 'nifNum', 'statNum'],
  properties: {
    displayName: { type: 'string' },
    foundedAt: { type: 'string' },
    nifNum: { type: 'string' },
    statNum: { type: 'string' },
    description: { type: 'string' },
  },
}

const jsonSchema = {
  schema: {
    body: bodyJsonSchema,
  },
}

const companiesRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.post<{ Body: Body }>(
    '/',
    jsonSchema,
    async function (request, reply) {
      const { db } = this.mongo
      const { displayName, description, foundedAt, nifNum, statNum } =
        request.body
      try {
        if (!db) throw new Error('DB instance is undefined')

        const collection = await db.collection('companies')
        const data = await collection.insertOne({
          description,
          displayName,
          foundedAt: new Date(foundedAt),
          nifNum,
          statNum,
        })
        reply.send({ id: data.insertedId })
      } catch (err) {
        fastify.log.error(err)
      }
    }
  )
}

module.exports = companiesRoutes
