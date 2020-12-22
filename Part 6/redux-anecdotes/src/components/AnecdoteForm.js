import React from 'react'
import {connect} from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const handleClick = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.createAnecdote({
      content: content,
      votes: 0
    })
    props.setNotification('Successfully created new note', 5)
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


const mapDispatchToProps = {
  setNotification,
  createAnecdote
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm