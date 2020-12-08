import anecdoteService from '../services/anecdotes'

// functionality

const castVote = (state, id) => {
  let anecdoteToChange = state.find (anecdote => {
    return anecdote.id === id
  })
  anecdoteToChange =
    {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    }
  const sortedAnecdotes = sortAnecdotesByVotes (
    state.map (anecdote =>
      anecdote.id === id
      ? anecdoteToChange
      : anecdote
    ))
  return sortedAnecdotes
}

const addNewAnecdote =  (state, anecdote) => {
  const updatedAnecdotes = state.concat(anecdote)
  return updatedAnecdotes
}


// thunk function creators (used by the components)

export const fetchAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService
      .getAll()
    dispatch(initAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteInDb = await anecdoteService
      .createNew(anecdote)
    dispatch(addAnecdote(anecdoteInDb))
  }
}


// helpers
const sortAnecdotesByVotes = (anecdotes) => {
  const sortedAnecdotes = anecdotes.sort ((lhs, rhs) => {
    return rhs.votes - lhs.votes
  })
  return sortedAnecdotes
}

// action creators

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

const addAnecdote = (content) => {
  return {
    type: 'ADD',
    data: content
  }
}


const initAnecdotes = (data) => {
  return {
    type: 'INIT',
    data: data
  }
}

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'VOTE':
      return castVote(state, action.data.id)
    case 'ADD':
      return addNewAnecdote(state, action.data)
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer