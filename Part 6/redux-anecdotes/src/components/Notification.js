import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector (state => state.notification.content)
  const isVisible = useSelector (state => state.notification.visibility)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: `${ isVisible
      ? ''
      : 'none'
    }`
  }

  return (
    <div
      style= {style}
    >
      {notification}
    </div>
  )
}

export default Notification