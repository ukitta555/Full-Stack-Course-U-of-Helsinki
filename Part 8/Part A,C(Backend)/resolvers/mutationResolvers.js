const SECRETS = require('../utils/config')
const Book = require('../models/book')
const Author = require('../models/author')
const User = require ('../models/user')
const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server-errors')


const JWT_SECRET = SECRETS.JWT_SECRET

const mutationResolvers = {
  addBook: async (root, args, {currentUser}) => {
    if (!currentUser) {
      throw new AuthenticationError("Not authenticated!")
    }
    const bookToAdd = new Book({ ...args })
    try {
      await bookToAdd.save()
    }
    catch (error) {
      throw new UserInputError(error.message, {invalidArgs: args})
    }
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