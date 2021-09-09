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

const cb: closeWithGrace.CloseWithGraceAsyncCallback = async ({ err }) => {
  if (err) {
    fastify.log.error(err)
  }
  await fastify.close()
}

// add hook
const closeListeners = closeWithGrace({ delay: 500 }, cb)
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
