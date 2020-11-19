import React from 'react'
import LoginUsername from "./LoginUsername"
import LoginPassword from "./LoginPassword"
import loginService from "../services/login"

const Login = ({username, setUsername, password, setPassword, user, setUser}) => {

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
        console.log(`logging in with ${username} ${password}`)
      }
    } catch (exception)
    {
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
    username
    <LoginUsername
      username = {username}
      handleUsernameChange = {handleUsernameChange}
    />
    <br></br>
    password
    <LoginPassword
      password = {password}
      handlePasswordChange = {handlePasswordChange}
    />
    <br></br>
    <button type = "submit"> push </button>
  </form>)
}

export default Login