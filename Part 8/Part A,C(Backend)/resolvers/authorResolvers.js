const Book = require('../models/book')

const authorResolvers = {
  bookCount: async (root) => {
    console.log('bookcount')
    const numberOfBooks = root.books ? root.books.length : 0
    return numberOfBooks
  }
}

module.exports = authorResolvers