import React, { useState, useEffect } from 'react'
import {useQuery} from '@apollo/client'
import { GET_FAVOURITE_GENRE } from '../queries/queries'
import BookList from './BookList'

const Recommendations = ({show}) => {
  const favGenreResult = useQuery(GET_FAVOURITE_GENRE)
  const [favouriteGenre, setFavouriteGenre] = useState(null)

  useEffect(() => {
    if (favGenreResult.data) {
      setFavouriteGenre(favGenreResult.data.me.favouriteGenre)
    }
  }, [favGenreResult.data])



  if(!show) return null


  return (
    <div>
      <h2>Recommendations</h2>
      <p> Books in your favourite genre <b>{favouriteGenre}</b> </p>
      <BookList
        selectedGenre = {favouriteGenre}
      />
    </div>
  )
}

export default Recommendations