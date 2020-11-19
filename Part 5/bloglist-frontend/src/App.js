import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Login from './components/Login'

const App = () => {
  const [blogs, setBlogs] = useState([])
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
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  const loginCopmonent = <Login
      username = {username}
      password = {password}
      user = {user}
      setUsername = {setUsername}
      setPassword = {setPassword}
      setUser = {setUser}
    />

  const blogsComponent = <Blogs
      blogs = {blogs}
      user = {user}
      setUser = {setUser}
  />

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