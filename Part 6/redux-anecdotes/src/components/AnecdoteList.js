import React from 'react'
import {connect} from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import AnecdoteFilter from './AnecdoteFilter'

const AnecdoteList = (props) => {
  console.log('This is an anecdote list', props.anecdotes)

  const vote = (anecdote) =>
  {
    props.voteAnecdote(anecdote)
    props.setNotification(` you sucessfully voted for anecdote ${anecdote.content}`, 5)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteFilter />
        {props.anecdotes.map(anecdote =>
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

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {anecdotes: state.anecdotes}
  }
  const filteredAnecdotes = state.anecdotes
  .filter(anecdote => {
    return anecdote
      .content
      .toLowerCase()
      .includes(state.filter.toLowerCase())
  })
  return {anecdotes: filteredAnecdotes}
}

const ConnectedList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default  ConnectedList