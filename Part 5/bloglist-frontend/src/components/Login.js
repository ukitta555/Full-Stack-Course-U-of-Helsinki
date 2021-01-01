import React from 'react'
import {useDispatch} from 'react-redux'
import LoginUsername from './LoginUsername'
import LoginPassword from './LoginPassword'
import loginService from '../services/login'
import blogService from '../services/blogs'
import {setNotification} from '../reducers/NotificationReducer'


const Login = ({
  username, setUsername,
  password, setPassword,
  setUser
}) =>
{
  const dispatch = useDispatch()

  const handleLogin = async (event) =>
  {
    event.preventDefault()
    try
    {
      const userData = await loginService
        .login({ username, password })

      if (userData)
      {
        window.localStorage.setItem(
          'loggedBlogappUser',
          JSON.stringify(userData)
        )
        setUser(userData)
        setPassword('')
        setUsername('')
        blogService.setToken(userData.token)
        console.log(`logging in with ${username} ${password}`)
      }
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
  return (
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

export default Login