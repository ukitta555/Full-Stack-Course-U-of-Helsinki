const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

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

const addNewAnecdote = (state, content) => {
  const updatedAnecdotes = state.concat(asObject(content))
  return updatedAnecdotes
}

const sortAnecdotesByVotes = (anecdotes) => {
  const sortedAnecdotes = anecdotes.sort ((lhs, rhs) => {
    return rhs.votes - lhs.votes
  })
  return sortedAnecdotes
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: {id}
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'ADD',
    data: {content}
  }
}


const initialState =  anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'VOTE':
      return castVote(state, action.data.id)
    case 'ADD':
      return addNewAnecdote(state, action.data.content)
    default:
      return state
  }
}

export default anecdoteReducer