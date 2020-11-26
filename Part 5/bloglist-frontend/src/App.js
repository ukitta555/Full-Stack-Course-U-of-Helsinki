import React, { useState, useEffect, useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () =>
{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const [isGood, setIsGood] = useState(true)
  const [blogs, setBlogs] = useState([])

  const addBlog = async (newBlog) =>
  {
    console.log(newBlog)
    const blogFromDB = await blogService.createBlog(newBlog)
    const blogWithUsername = {
      ...blogFromDB,
      user: {
        name: user.name
      }
    }
    setBlogs(blogs.concat(blogWithUsername))
    setIsGood(true)
    updateNotification(`a new blog ${blogFromDB.title} by ${blogFromDB.author} added`)
    newBlogFormRef.current.toggleVisibility()
  }

  const updateNotification = (text) =>
  {
    setNotification(text)
    setTimeout(() => setNotification(null), 5000)
  }

  useEffect(() =>
  {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedBlogappUser'
    )
    if (loggedUserJSON)
    {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const loginCopmonent = (
    <Login
      username = {username}
      password = {password}
      setUsername = {setUsername}
      setPassword = {setPassword}
      setUser = {setUser}
      setIsGood = {setIsGood}
      updateNotification = {updateNotification}
    />
  )

  const newBlogFormRef = useRef()

  const blogsComponent = (
    <div>
      <Blogs
        user = {user}
        setUser = {setUser}S
        blogs = {blogs}
        setBlogs = {setBlogs}
      />
      <Togglable buttonText = 'add new blog!' ref = {newBlogFormRef}>
        <NewBlogForm
          addBlog = {addBlog}
          setIsGood = {setIsGood}
          updateNotification = {updateNotification}
        />
      </Togglable>
    </div>
  )


  return (
    <div>
      <Notification
        notification = {notification}
        isGood = {isGood}
      />
      {
        user
          ? blogsComponent
          : loginCopmonent
      }
    </div>
  )
}

export default App