import React from 'react'
import {useDispatch} from 'react-redux'
import {addAnecdote} from '../reducers/anecdoteReducer'
import {showNotification} from '../reducers/notificationReducer'
import {hideNotification} from '../reducers/notifVisibilityReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleClick = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdoteInDb = await anecdoteService.createNew({
      content: content,
      votes: 0
    })
    console.log(anecdoteInDb)
    dispatch(addAnecdote(anecdoteInDb))
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