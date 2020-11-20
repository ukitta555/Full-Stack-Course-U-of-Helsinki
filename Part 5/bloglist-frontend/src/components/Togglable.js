import React, {useState} from "react"

const Togglable = (props) => {
  const [isVisible, setIsVisible] = useState (false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const hideWhenVisible = {display: isVisible ? 'none' : ''}
  const showWhenVisible = {display: isVisible ? '' : 'none'}

  return (
    <div>
      <div style = {hideWhenVisible}>
        <button onClick = {toggleVisibility}> {props.buttonText} </button>
      </div>
      <div style = {showWhenVisible}>
        {props.children}
        <button onClick = {toggleVisibility}> cancel </button>
      </div>
    </div>
  )
}

export default Togglable