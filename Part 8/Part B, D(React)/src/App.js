
import React, { useState, useEffect } from 'react'
import Authors from './components/authors/Authors'
import Books from './components/books/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendations from './components/books/Recommendations'
import { BOOK_ADDED, GET_BOOKS_BY_GENRE } from './components/queries/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()


  const updateCacheWith = (bookToAdd) => {
    const isInCache = (cache, item) => {
      return cache.map(book => book.id).includes(id => id === item.id)
    }

    const cacheData = client.readQuery({ query: GET_BOOKS_BY_GENRE, variables: { genre: null } })


    if (cacheData && !isInCache(cacheData.allBooks, bookToAdd)) {
      client.writeQuery({
        query: GET_BOOKS_BY_GENRE,
        variables: { genre: null },
        data: {allBooks: cacheData.allBooks.concat(bookToAdd)}
      })
    }

  }


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      // logic
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      updateCacheWith(addedBook)

      // view
      window.alert(addedBook.title)
      console.log(addedBook)
    }
  })

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('book-app-token')
    setToken(tokenFromStorage)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setToken(null)
    client.clearStore()
    setPage('login')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token
            ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommendations')}>recommendations</button>
              <button onClick={handleLogout}>logout</button>
            </>
            : <button onClick={() => setPage('login')}>login </button>
        }

      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

      <Recommendations
        show={page === 'recommendations'}
      />
    </div>
  )
}

export default App