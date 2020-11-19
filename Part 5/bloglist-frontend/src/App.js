import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem
      (
        'loggedBlogappUser'
      )
    if (loggedUserJSON)
    {
      setUser(JSON.parse(loggedUserJSON))
    }
  }, [])

  const loginCopmonent = <Login
      username = {username}
      password = {password}
      setUsername = {setUsername}
      setPassword = {setPassword}
      setUser = {setUser}
    />

  const blogsComponent = (
    <div>
      <Blogs
        user = {user}
        setUser = {setUser}
      />
      <NewBlogForm
        user = {user}
      />
    </div>
  )
  return (
    <div>
      {
        user
        ? blogsComponent
        : loginCopmonent
      }
    </div>
  )
}

export default App