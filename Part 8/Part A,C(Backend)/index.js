require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const mongoose = require('mongoose')
const rootType = require ('./types/rootType')
const rootResolver = require('./resolvers/rootResolver')

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => console.log('connected to MongoDB'))
  .catch((err) => console.log(err.message))

const typeDefs = rootType

const resolvers = rootResolver

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})