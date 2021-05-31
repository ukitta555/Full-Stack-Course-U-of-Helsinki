const queryResolvers = require('./queryResolvers')
const authorResolvers = require('./authorResolvers')
const mutationResolvers = require('./mutationResolvers')

const rootResolver = {
  Query: queryResolvers,
  Author: authorResolvers,
  Mutation: mutationResolvers
}

module.exports = rootResolver