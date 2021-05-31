const BOOK_TYPE = `type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }`

module.exports = BOOK_TYPE