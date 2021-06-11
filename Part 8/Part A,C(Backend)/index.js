const SECRETS = require('./utils/config')
const { ApolloServer } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')
const jwt = require ('jsonwebtoken')
const rootType = require ('./types/rootType')
const rootResolver = require('./resolvers/rootResolver')
const User = require('./models/user')


mongoose.connect(SECRETS.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log(err.message))

mongoose.set('debug', true);

const typeDefs = rootType

const resolvers = rootResolver

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const request = req
    const auth = request ? request.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRETS.JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})