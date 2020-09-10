const logger = require ('./logger')


const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  logger.info('unknown endpoint!')
  response.status(404).send ({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'ValidationError') {
    return response.status(400).end()
  }
  response.status(404).send ({ error: 'error! You are in an error handler function.' })
  next(error)
}

module.exports = { unknownEndpoint, errorHandler, requestLogger }