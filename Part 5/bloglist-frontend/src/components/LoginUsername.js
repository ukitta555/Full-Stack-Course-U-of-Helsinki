import React from 'react'

const LoginUsername = ({ username, handleUsernameChange }) =>
{
  return (<input
    type = 'text'
    id = 'loginUsernameInput'
    value = {username}
    name = 'Username'
    onChange = {handleUsernameChange}
  >

  </input>)
}
export default LoginUsername