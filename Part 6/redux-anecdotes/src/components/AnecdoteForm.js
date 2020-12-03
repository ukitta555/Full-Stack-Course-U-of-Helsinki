import React from 'react'
import {useDispatch} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'
import {hideNotification} from '../reducers/notifVisibilityReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleClick = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
    dispatch(showNotification('Successfully created new note'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
  <div>
    <h2>create new</h2>
      <form onSubmit = {handleClick}>
        <div><input name = 'anecdote'/></div>
        <button>create</button>
      </form>
  </div>
 )
}

export default AnecdoteForm