const fastifyPlugin = require('fastify-plugin')
const { MongoClient } = require('mongodb')

const dbConnector = async (fastify, options) => {
  const { url } = options
  // eslint-disable-next-line no-param-reassign
  delete options.url

  const db = await MongoClient.connect(url, options)
  return fastify.decorate('mongo', db)
}

module.exports = fastifyPlugin(dbConnector)
