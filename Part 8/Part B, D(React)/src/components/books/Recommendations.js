import React, { useState, useEffect } from 'react'
import {useQuery} from '@apollo/client'
import { ALL_BOOKS, GET_FAVOURITE_GENRE } from '../queries/queries'
import BookList from './BookList'

const Recommendations = ({show}) => {
  const favGenreResult = useQuery(GET_FAVOURITE_GENRE)
  const allBooksResult = useQuery(ALL_BOOKS)
  const [favouriteGenre, setFavouriteGenre] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (favGenreResult.data) {
      setFavouriteGenre(favGenreResult.data.me.favouriteGenre)
    }
    if (allBooksResult.data) {
      setBooks(allBooksResult.data.allBooks)
    }
  }, [favGenreResult.data, allBooksResult.data])



  if(!show) return null


  return (
    <div>
      <h2>Recommendations</h2>
      <p> Books in your favourite genre <b>{favouriteGenre}</b> </p>
      <BookList
        books = {books}
        selectedGenre = {favouriteGenre}
      />
    </div>
  )
}

export default Recommendations