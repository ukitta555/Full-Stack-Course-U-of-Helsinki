import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries/queries'
import { Set } from 'immutable'
import BookList from './BookList'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState(Set([]))
  const [selectedGenre, setSelectedGenre] = useState(null)

  useEffect(() => {
    if (result.data) {
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

      <BookList
        selectedGenre={selectedGenre}
      />
      {
        genres.toArray().map(genre => <button key={genre} onClick={() => setSelectedGenre(genre)}> {genre} </button>)
      }
      <button key={'all-genres'} onClick={() => setSelectedGenre(null)}> all genres </button>
    </div>
  )
}

export default Books