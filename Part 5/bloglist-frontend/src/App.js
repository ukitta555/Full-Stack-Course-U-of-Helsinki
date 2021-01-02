import React, { useState, useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import {setNotification} from './reducers/NotificationReducer'
import {createBlog} from './reducers/BlogsReducer'


const App = () =>
{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

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
    />
  )

  const newBlogFormRef = useRef()

  const addBlog = async (newBlog) =>
  {
    dispatch(createBlog(newBlog))

    const blogFromDB = {
      ...newBlog,
      user: {
        name: user.name
      }
    }
    dispatch(setNotification({
      content: `a new blog ${blogFromDB.title} by ${blogFromDB.author} added`,
      isGood: true
    }))
    newBlogFormRef.current.toggleVisibility()
  }

  const blogsComponent = (
    <div>
      <Blogs
        user = {user}
        setUser = {setUser}
      />
      <Togglable buttonText = 'add new blog!' ref = {newBlogFormRef}>
        <NewBlogForm
          addBlog = {addBlog}
        />
      </Togglable>
    </div>
  )


  return (
    <div>
      <Notification
        notification = {notification}
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