const Book = require('../models/book')
const Author = require('../models/author')
const { UserInputError } = require('apollo-server-errors')

const mutationResolvers = {
  addBook: async (root, args) => {
    const bookToAdd = new Book({ ...args })
    try {
      await bookToAdd.save()
    }
    catch (error) {
      throw new UserInputError(error.message, {invalidArgs: args})
    }
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
  editAuthor: async (root, args) => {
    let authorToEdit
    try {
      authorToEdit = await Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
    }
    catch (error) {
      throw new UserInputError (error.message, {invalidArgs: args})
    }
    return authorToEdit
  }
}

module.exports = mutationResolvers