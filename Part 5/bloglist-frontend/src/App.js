import React, { useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'

import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import {setNotification} from './reducers/NotificationReducer'
import {createBlog} from './reducers/BlogsReducer'
import {setUser} from './reducers/UserReducer'

const App = () =>
{
  const user = useSelector(state => state.user)
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
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])



  const loginCopmonent = (
    <Login
    />
  )

  const newBlogFormRef = useRef()

  const addBlog = async (newBlog) =>
  {
    const expandedBlog = {
      ...newBlog,
      user: {
        name: user.name
      }
    }
    dispatch(createBlog(expandedBlog))
    dispatch(setNotification({
      content: `a new blog ${expandedBlog.title} by ${expandedBlog.author} added`,
      isGood: true
    }))
    newBlogFormRef.current.toggleVisibility()
  }

  const blogsComponent = (
    <div>
      <Blogs
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