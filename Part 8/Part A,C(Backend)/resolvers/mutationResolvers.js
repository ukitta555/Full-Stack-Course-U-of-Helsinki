const SECRETS = require('../utils/config')
const Book = require('../models/book')
const Author = require('../models/author')
const pubSub = require('./pubSub')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server-errors')



const JWT_SECRET = SECRETS.JWT_SECRET

const mutationResolvers = {
  addBook: async (root, args, {currentUser}) => {
    if (!currentUser) {
      throw new AuthenticationError("Not authenticated!")
    }
    let bookAuthor = await Author.findOne({name: args.author})
    if (!bookAuthor) {
      bookAuthor = new Author({name: args.author, born: null, books: []})
      try {
        await bookAuthor.save()
      }
      catch(error) {
        throw new UserInputError(error.message, {invalidArgs: args})
      }
    }
    const bookToAdd = new Book({ ...args, author: bookAuthor._id })
    try {
      await bookToAdd.save()
      await bookAuthor.update({books: [...bookAuthor.books, bookToAdd._id]})
    }
    catch (error) {
      throw new UserInputError(error.message, {invalidArgs: args})
    }
    await bookToAdd.populate('author').execPopulate()

    pubSub.publish('BOOK_ADDED', {bookAdded: bookToAdd})
    console.log(bookToAdd)

    return bookToAdd
  },
  addAuthor: async (root, args) => {
    const authorToAdd = new Author({ ...args })
    try {
      await authorToAdd.save()
    }
    catch (error) {
      throw new UserInputError (error.message, {invalidArgs: args})
    }
    return authorToAdd
  },
  editAuthor: async (root, args, {currentUser}) => {
    if (!currentUser) {
      throw new AuthenticationError("Not authenticated!")
    }
    let authorToEdit
    try {
      authorToEdit = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    }
    catch (error) {
      throw new UserInputError (error.message, {invalidArgs: args})
    }
    return authorToEdit
  },
  createUser: async (root, args) => {
    const newUser = new User({...args})
    try {
      await newUser.save()
    }
    catch (error) {
      throw new UserInputError (error.message, {invalidArgs: args})
    }
    return newUser
  },
  login: async (root, args) => {
    const userFromDB = await User.findOne({username: args.username})
    let token
    if (args.password === "ilovepizza" && userFromDB) {
      const userForToken = { username: userFromDB.username, id: userFromDB._id }
      token = jwt.sign(userForToken, JWT_SECRET)
    }
    else {
      throw new UserInputError("Wrong credentials!")
    }

    return {value: token}
  }
}

module.exports = mutationResolvers