import React, { useEffect, useState } from 'react'
import { GET_BOOKS_BY_GENRE } from '../queries/queries'
import { useQuery } from '@apollo/client'


const BookList = ({selectedGenre}) => {
  const getBooksResult = useQuery(GET_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre }
  })
  const [books, setBooks] = useState([])
  useEffect(() => {
    if (getBooksResult.data) {
      setBooks(getBooksResult.data.allBooks)
    }
  }, [getBooksResult.data])
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .map(book =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default BookList