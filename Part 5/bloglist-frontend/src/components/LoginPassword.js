import React from 'react'

const LoginPassword = ({ password, handlePasswordChange }) => (
  <input
    type = 'password'
    id = 'loginPasswordInput'
    value = {password}
    name = "Password"
    onChange = {handlePasswordChange}
  >
  </input>
)

export default LoginPassword