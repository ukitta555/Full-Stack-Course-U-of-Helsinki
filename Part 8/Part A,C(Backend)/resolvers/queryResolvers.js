const Book = require('../models/book')
const Author = require('../models/author')

const queryResolvers = {
  bookCount: () => {
    return Book.countDocuments({})
  },
  authorCount: () => {
    return Author.countDocuments({})
  },
  allBooks: async (root, args) => {
    let searchOptions
    if (args.author) {
      searchOptions.author = args.author
    }

    if (args.genre) {
      searchOptions.genres = { $in: args.genre }
    }

    // const books = Book.find(searchOptions).populate('author').execPopulate()

    const books = await Book.find(searchOptions).populate({path: 'author'})
    return books
  },
  allAuthors: () => {
    return Author.find({})
  },
  me: (root, args, context) => {
    return context.currentUser
  }
}

module.exports = queryResolvers