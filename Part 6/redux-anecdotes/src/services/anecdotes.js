import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const anecdotes = await axios.get(baseUrl)
  return anecdotes.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseUrl, anecdote)
  return response.data
}

const update = async (newAnecdote) => {
  await axios.put(`${baseUrl}/${newAnecdote.id}`, newAnecdote)
}

export default {getAll, createNew, update}