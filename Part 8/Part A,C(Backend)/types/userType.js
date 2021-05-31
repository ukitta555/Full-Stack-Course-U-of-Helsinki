const { gql } = require('apollo-server')

const userType = gql`
type User {
  username: String!
  favouriteGenre: String!
  id: ID!
}
`

module.exports = userType