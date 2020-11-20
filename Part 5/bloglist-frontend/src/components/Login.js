import React from 'react'
import LoginUsername from "./LoginUsername"
import LoginPassword from "./LoginPassword"
import loginService from "../services/login"
import blogService from "../services/blogs"

const Login = ({
  username, setUsername,
  password, setPassword,
  setUser,
  setIsGood,
  updateNotification
  }) => {

  const handleLogin = async (event) => {
    event.preventDefault()
    try
    {
      const userData = await loginService
      .login({username, password})

      if (userData)
      {
        window.localStorage.setItem
          (
            'loggedBlogappUser',
            JSON.stringify(userData)
          )
        setUser(userData)
        setPassword('')
        setUsername('')
        blogService.setToken(userData.token)
        console.log(`logging in with ${username} ${password}`)
      }
    } catch (exception)
    {
      setIsGood(false)
      updateNotification('Failed to login! Wrong username or password')
      console.log (`Wrong credentials ${exception}`)
    }

  }

  const handleUsernameChange = ({target}) => {
    console.log(target.value)
    setUsername(target.value)
  }

  const handlePasswordChange = ({target}) =>
  {
    console.log(target.value)
    setPassword(target.value)
  }
  return (<form onSubmit = {handleLogin}>
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
    <button type = "submit"> push </button>
  </form>)
}

export default Login