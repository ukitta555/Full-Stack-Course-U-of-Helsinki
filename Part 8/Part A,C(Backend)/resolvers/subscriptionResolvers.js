const pubSub = require('./pubSub')

const subscriptionResolvers = {
  bookAdded: {
      subscribe: () =>  {
        const iterator = pubSub.asyncIterator(['BOOK_ADDED'])
        return iterator
      }
  }
}

module.exports = subscriptionResolvers