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
    ): Author,
    createUser(
      username: String!
      favouriteGenre: String!
    ): User,
    login(
      username: String!
      password: String!
    ): Token,
    me: User
  }
`

module.exports = MUTATION_TYPE