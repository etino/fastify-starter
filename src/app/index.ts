import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { FastifyPluginAsync } from 'fastify'
import fastifyMongodb from 'fastify-mongodb'

export type AppOptions = Partial<AutoloadPluginOptions>

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // ecosystem plugins
  void fastify.register(fastifyMongodb, {
    forceClose: true,
    url: 'mongodb://127.0.0.1:27017/fastify-starter',
  })
  // routes
  void fastify.register(AutoLoad, {
    dir: join(__dirname, '..', 'routes'),
    options: opts,
  })
}

export default app
export { app }
