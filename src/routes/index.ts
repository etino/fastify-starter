import { FastifyPluginAsync } from 'fastify'

const rootRoutes: FastifyPluginAsync = async (fastify): Promise<void> => {
  fastify.get('/', async function (req, res) {
    res.send({ root: 'this is the root api' })
  })
}

export default rootRoutes
