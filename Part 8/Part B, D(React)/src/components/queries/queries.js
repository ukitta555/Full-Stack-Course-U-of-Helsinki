import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
 query{
   allBooks{
     author{
       name
     },
     published,
     title,
     id,
     genres
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
    title
    author {
      name
    }
    published
    genres
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

export const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`

export const GET_FAVOURITE_GENRE = gql`
query getFavouriteGenre{
  me{
    favouriteGenre
  }
}
`

export const GET_BOOKS_BY_GENRE = gql`
query getBooksByGenre($genre: String) {
  allBooks(
    genre: $genre
  ) {
    author {
       name
     }
     published
     title
     id
     genres
  }
}
`

export const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  author {
    name
  }
  published
  title
  id
  genres
 }
`

export const BOOK_ADDED = gql`
 subscription {
   bookAdded {
     ...BookDetails
   }
 }

 ${BOOK_DETAILS}
`
