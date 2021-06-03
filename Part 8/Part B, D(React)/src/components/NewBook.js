import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, CREATE_BOOK, GET_BOOKS_BY_GENRE } from './queries/queries'


const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, {query: ALL_AUTHORS}],
    update: (store, {data: {addBook}}) => {
      console.log(addBook)
      console.log(store)

      addBook.genres.map (genre => {
        //debugger;
        const dataInStore = store.readQuery({query: GET_BOOKS_BY_GENRE, variables: {genre}})
        console.log(dataInStore)
        if (dataInStore) {
          const updatedCache = {
            ...dataInStore,
            allBooks: [...dataInStore.allBooks, addBook],
          }
          console.log('updatedCache:', updatedCache)
          store.writeQuery({
            query: GET_BOOKS_BY_GENRE,
            variables: { genre },
            data: updatedCache
          })
        }
      })

    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    console.log('add book...')
    createBook({ variables: { title, author, published: Number(published), genres } })

    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook