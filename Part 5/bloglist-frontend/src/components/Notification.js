import React from 'react'
import '../App.css'

const Notification = ({ notification, isGood }) =>
{
  if (notification === null)
  {
    return null
  }

  return (
    <div className = {
      `Notification
      ${isGood ? ' Good' : ' Bad'}`
    }>
      {notification}
    </div>
  )
}

export default Notification