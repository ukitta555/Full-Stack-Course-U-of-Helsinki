const { gql } = require('apollo-server')
const BOOK_TYPE = require('./bookType')
const AUTHOR_TYPE = require('./authorType')
const QUERY_TYPE = require('./queryType')
const MUTATION_TYPE = require('./mutationType')
const USER_TYPE = require ('./userType')
const TOKEN_TYPE = require('./tokenType')


const rootType = gql`
  ${BOOK_TYPE}

  ${AUTHOR_TYPE}

  ${QUERY_TYPE}

  ${MUTATION_TYPE}

  ${USER_TYPE}

  ${TOKEN_TYPE}
`

module.exports = rootType