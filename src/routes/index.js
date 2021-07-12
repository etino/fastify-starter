async function routes(fastify) {
  fastify.get('/', async function (req, res) {
    res.send({ root: 'hello' })
  })
}

module.exports = routes
