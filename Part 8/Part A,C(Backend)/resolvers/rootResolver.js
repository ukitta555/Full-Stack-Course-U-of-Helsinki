const queryResolvers = require('./queryResolvers')
const authorResolvers = require('./authorResolvers')
const mutationResolvers = require('./mutationResolvers')
const subscriptionResolvers = require('./subscriptionResolvers')

const rootResolver = {
  Query: queryResolvers,
  Author: authorResolvers,
  Mutation: mutationResolvers,
  Subscription: subscriptionResolvers
}

module.exports = rootResolver