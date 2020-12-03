import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notifVisibilityReducer'
import AnecdoteFilter from './AnecdoteFilter'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    const filteredAnecdotes = state.anecdotes
    .filter(anecdote => {
      return anecdote
        .content
        .toLowerCase()
        .includes(state.filter.toLowerCase())
    })
    return filteredAnecdotes
  })

  const dispatch = useDispatch()

  const vote = (id) =>
  {
    dispatch(voteAnecdote(id))
    dispatch(showNotification('Successfully voted for the anecdote'))
    setTimeout(() => {
      dispatch(hideNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default  AnecdoteList