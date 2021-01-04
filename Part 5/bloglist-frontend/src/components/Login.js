import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import LoginUsername from './LoginUsername'
import LoginPassword from './LoginPassword'

import blogService from '../services/blogs'
import {setNotification} from '../reducers/NotificationReducer'
import {login, setUser} from '../reducers/UserReducer'

const Login = () =>
{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector (state => state.user)

  const logOut = () =>
  {
    dispatch(setUser(null))
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleLogin = async (event) =>
  {
    event.preventDefault()
    try
    {
      dispatch(login(username, password))
      setPassword('')
      setUsername('')
    }
    catch (exception)
    {
      dispatch(setNotification({
        content: 'Failed to login! Wrong username or password',
        isGood: false
      }))
      console.log (`Wrong credentials ${exception}`)
    }
  }

  const handleUsernameChange = ({ target }) =>
  {
    console.log(target.value)
    setUsername(target.value)
  }

  const handlePasswordChange = ({ target }) =>
  {
    console.log(target.value)
    setPassword(target.value)
  }

  let userInfo
  // if logged in, load user info
  // otherwise, load login form
  if (user) {
    userInfo = (
      <div>
        <p>
          {user.name} logged in
          <button
            type="button"
            onClick = {logOut}
            id = 'logoutButton'
          >
            logout
          </button>
        </p>
      </div>
    )
  }
  else {
    userInfo = (
      <form onSubmit = {handleLogin}>
        <h2>log in to the blog application</h2>
        <div>
        username
          <LoginUsername
            username = {username}
            handleUsernameChange = {handleUsernameChange}
          />
        </div>
        <div>
        password
          <LoginPassword
            password = {password}
            handlePasswordChange = {handlePasswordChange}
          />
        </div>
        <button
          id = 'loginButton'
          type = "submit"
        >
          login
        </button>
      </form>
    )
  }

  return (
    <div>
      {userInfo}
    </div>
  )
}

export default Login