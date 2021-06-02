import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from './queries/queries'
import { Set } from 'immutable'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState(Set([]))
  const [books, setBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      let allGenres = Set([])
      for (let book of result.data.allBooks) {
        for (let genre of book.genres) {
          allGenres = allGenres.add(genre)
        }
      }
      setGenres(allGenres)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div> loading.... </div>
  }

  return (
    <div>
      <h2>books</h2>

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
            .filter(book => {
              if (!selectedGenre) {
                return true
              }
              else {
                if (book.genres.includes(selectedGenre)) {
                  return true
                }
                else return false
              }
            })
            .map(book =>
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            )}
        </tbody>
      </table>
      {
        genres.toArray().map(genre => <button key={genre} onClick = {() => setSelectedGenre(genre)}> {genre} </button>)
      }
      <button key={'all-genres'} onClick={() => setSelectedGenre(null)}> all genres </button>
    </div>
  )
}

export default Books