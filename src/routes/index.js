async function routes(fastify) {
  fastify.get('/', async function (req, res) {
    res.send({ root: 'this is the root api route' })
  })
}

module.exports = routes
