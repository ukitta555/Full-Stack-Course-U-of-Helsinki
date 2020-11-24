import React, {useState, useImperativeHandle} from "react"

const Togglable = React.forwardRef((props, ref) => {
  const [isVisible, setIsVisible] = useState (false)

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const hideWhenVisible = {display: isVisible ? 'none' : ''}
  const showWhenVisible = {display: isVisible ? '' : 'none'}

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
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
})

export default Togglable