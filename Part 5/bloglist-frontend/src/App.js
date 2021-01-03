import React, { useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {BrowserRouter as Router,
  Switch, Route} from 'react-router-dom'


import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'

import blogService from './services/blogs'
import {setNotification} from './reducers/NotificationReducer'
import {createBlog} from './reducers/BlogsReducer'
import {setUser} from './reducers/UserReducer'


//TODO: add route handling useing react router
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
      <Blogs />
      <Togglable buttonText = 'add new blog!' ref = {newBlogFormRef}>
        <NewBlogForm
          addBlog = {addBlog}
        />
      </Togglable>
    </div>
  )


  return (
    <div>
      <h2>blogs</h2>
      <Login />
      <Router>
        <Notification
          notification = {notification}
        />
        <Switch>
          <Route path = '/users/'>
            <Users />
          </Route>
          <Route path = '/'>
            {
              user
                ? blogsComponent
                : null
            }
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App