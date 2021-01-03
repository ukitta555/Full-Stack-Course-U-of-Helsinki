import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import LoginUsername from './LoginUsername'
import LoginPassword from './LoginPassword'
import {setNotification} from '../reducers/NotificationReducer'
import {login} from '../reducers/UserReducer'

const Login = () =>
{
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

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