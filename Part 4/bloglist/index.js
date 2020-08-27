const app = require ('./app')
const http = require ('http')
const config = require ('./utils/config')
const logger = require ('./utils/logger')

const server = http.createServer(app)

server.listen (config.PORT, () => {
  logger.info (`Server running on port ${config.PORT}`)
})

// add middleware handling + the middleware itself!
// add error handling in routing(?)