const fastify = require('fastify')({ logger: true })
const autoload = require('fastify-autoload')
const path = require('path')

// ecosystem plugins
fastify.register(require('fastify-mongodb'), {
  forceClose: true,
  url: 'mongodb://127.0.0.1:27017/fastify-starter',
})

// autoload routes
fastify.register(autoload, {
  dir: path.join(__dirname, 'routes'),
})

// start
fastify.listen(4001, '0.0.0.0', (err, address) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`server listening on ${address}`)
})
