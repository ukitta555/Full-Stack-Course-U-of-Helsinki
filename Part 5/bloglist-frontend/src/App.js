import React, { useEffect, useRef } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Switch, Route, useRouteMatch} from 'react-router-dom'


import Blogs from './components/Blogs'
import Login from './components/Login'
import NewBlogForm from './components/NewBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'

import blogService from './services/blogs'
import {setNotification} from './reducers/NotificationReducer'
import {createBlog} from './reducers/BlogsReducer'
import {setUser} from './reducers/UserReducer'
import {getAllUsers} from './reducers/AllUsersReducer'

//TODO: add route handling using react router
const App = () =>
{
  const match = useRouteMatch('/users/:id')
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const users = useSelector (state => state.users)
  const dispatch = useDispatch()

  //TODO use redux state to find matching user
  const userToShow = match
    ? users.find (user => {
      return user.id === match.params.id
    })
    : null


  useEffect(() => {
    async function fetchUsers() {
      await dispatch(getAllUsers())
    }
    fetchUsers()
  },[])

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
      <h2>Blogs</h2>
      <Login />
      <Notification
        notification = {notification}
      />
      <Switch>
        <Route path = '/users/:id'>
          <User user = {userToShow}/>
        </Route>
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
    </div>
  )
}

export default App