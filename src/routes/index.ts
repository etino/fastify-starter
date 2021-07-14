async function rootRoutes(fastify) {
  fastify.get('/', async function (req, res) {
    res.send({ root: 'this is the root api' })
  })
}

module.exports = rootRoutes
