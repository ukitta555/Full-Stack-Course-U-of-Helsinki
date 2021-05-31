import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
 query{
   allBooks{
     author{
       name
     },
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

export const UPDATE_AUTHOR_BIRTH = gql`
mutation updateBirthYear($name: String!, $year: Int!){
  editAuthor(
    name: $name,
    setBornTo: $year
  ) {
    name
    id
    born
  }
}
`