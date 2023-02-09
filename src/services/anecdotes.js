import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const fetchAnecdotes = () =>
  axios.get(baseUrl).then((response) => response.data)

export const createAnecdote = content =>
  axios.post(baseUrl, { content, votes: 0 }).then((response) => response.data)

export const updateAnecdote = anecdote =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((response) => response.data)