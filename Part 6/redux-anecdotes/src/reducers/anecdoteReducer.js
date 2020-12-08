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

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote =
      {
        ...anecdote,
        votes: anecdote.votes + 1
      }

    await anecdoteService.update(newAnecdote)
    dispatch(voteAnecdoteAction(newAnecdote.id))
  }
}

export const fetchAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService
      .getAll()
    dispatch(initAnecdotesAction(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteInDb = await anecdoteService
      .createNew(anecdote)
    dispatch(addAnecdoteAction(anecdoteInDb))
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

const voteAnecdoteAction = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

const addAnecdoteAction = (content) => {
  return {
    type: 'ADD',
    data: content
  }
}


const initAnecdotesAction = (data) => {
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
      return sortAnecdotesByVotes(action.data)
    default:
      return state
  }
}

export default anecdoteReducer