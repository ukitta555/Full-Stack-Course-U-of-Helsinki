
import React, { useState, useEffect } from 'react'
import Authors from './components/authors/Authors'
import Books from './components/books/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'
import Recommendations from './components/books/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

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