import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
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
  console.log('This is an anecdote list', anecdotes)
  const dispatch = useDispatch()

  const vote = (anecdote) =>
  {
    dispatch(voteAnecdote(anecdote))
    dispatch (setNotification(` you sucessfully voted for anecdote ${anecdote.content}`, 5))
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
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default  AnecdoteList