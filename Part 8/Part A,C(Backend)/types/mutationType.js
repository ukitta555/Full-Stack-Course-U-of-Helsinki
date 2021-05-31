const MUTATION_TYPE = `
  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String!]!
    ): Book!,
    addAuthor(
      name: String!,
      born: Int
    ): Author!,
    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

module.exports = MUTATION_TYPE