const { gql } = require('apollo-server')


const tokenType = gql`
type Token {
  value: String!
}
`

module.exports = tokenType