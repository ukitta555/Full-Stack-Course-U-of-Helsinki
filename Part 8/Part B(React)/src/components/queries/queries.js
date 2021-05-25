import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
 query{
   allBooks{
     author,
     published,
     title,
     id
   }
 }
`


export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      born,
      name,
      bookCount,
      id
    }
  }
`

export const CREATE_BOOK = gql`
mutation createPerson($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
  addBook (
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title,
    author,
    published,
    genres,
    id
  }
}
`