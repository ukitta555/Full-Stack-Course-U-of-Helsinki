const Book = require('../models/book')

const authorResolvers = {
  bookCount: (root) => {
    return Book.countDocuments({ author: root.id })
  }
}

module.exports = authorResolvers