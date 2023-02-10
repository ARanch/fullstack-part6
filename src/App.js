import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { useNotificationSetter } from './NotificationContext'

import { fetchAnecdotes, updateAnecdote } from './services/anecdotes'

// todo 6.23 implement notification using useReducer

const App = () => {
  const setNotification = useNotificationSetter()
  const queryClient = useQueryClient() // used for adding or updating data in the cache and server
  const anecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData('anecdotes', (oldAnecdotes) => {
        return oldAnecdotes.map((anecdote) => {
          if (anecdote.id === updatedAnecdote.id) {
            return updatedAnecdote
          }
          return anecdote
        })
      })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    anecdote.votes += 1
    anecdoteMutation.mutate(anecdote)
    setNotification(`You voted '${anecdote.content}'`)
  }

  const result = useQuery('anecdotes', fetchAnecdotes)

  if (result.isLoading) {
    return <div>Loading...</div>
  } else if (result.isError) {
    return <div>Error: {result.error.message}</div>
  }

  console.log(result.data)
  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
            , has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
