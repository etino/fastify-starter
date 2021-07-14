async function rootRoutes(fastify) {
  fastify.get('/', async function (req, res) {
    res.send({ root: 'this is the root api route' })
  })
}

module.exports = rootRoutes
