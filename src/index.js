const fastify = require('fastify')({ logger: true })

fastify.register(require('./db/our-db-connector'), {
  url: 'mongodb://127.0.0.1:27017/job',
  useUnifiedTopology: true,
  forceClose: true,
})

// fastify.register(require('fastify-mongodb'), {
//   forceClose: true,
//   url: 'mongodb://127.0.0.1:27017/job',
// })

fastify.register(require('./routes/our-first-route'))

fastify.listen(4001, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
