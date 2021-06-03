import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from './queries/queries'

const Login = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOGIN, {
    onError: (error) => console.log(error.graphQLErrors[0].message)
  })
  if (!show) return null

  const handleSubmit = async (event) => {
    event.preventDefault()
    const response = await login({variables: {username, password}})
    if (response){
      setToken(response.data.login.value)
      localStorage.setItem('book-app-token', response.data.login.value)
      setPage('authors')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'> Login! </button>
      </form>
    </div>
  )
}

export default Login