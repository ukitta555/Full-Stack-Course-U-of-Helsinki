import React from 'react'
import '../App.css'

const Notification = ({ notification }) =>
{
  if (notification.content === null)
  {
    return null
  }

  return (
    <div className = {
      `Notification
      ${notification.isGood ? ' Good' : ' Bad'}`
    }>
      {notification.content}
    </div>
  )
}

export default Notification