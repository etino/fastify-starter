import { config } from 'dotenv'
import Fastify from 'fastify'
import * as closeWithGrace from 'close-with-grace'

import app from './app'

// load env variable
config()

// register main app
const fastify = Fastify({
  logger: true,
})
fastify.register(app)

// add hook
const closeListeners = closeWithGrace(
  { delay: 500 },
  async function ({ signal, err, manual }) {
    if (err) {
      fastify.log.error(err)
    }
    await fastify.close()
  }
)
fastify.addHook('onClose', async (instance, done) => {
  closeListeners.uninstall()
  done()
})

// start
fastify.listen(process.env.PORT || 4001, (err) => {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
