import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../services/anecdotes'
import { useNotificationDispatch, useNotificationSetter } from '../NotificationContext'

const AnecdoteForm = () => {
  const dispatch = useNotificationDispatch()
  const setNotification = useNotificationSetter()
  console.debug('notification handler 🅰️', setNotification)
  const queryClient = useQueryClient()
  const anecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData('anecdotes', (oldAnecdotes) => {
        return [...oldAnecdotes, newAnecdote]
      })
    }
  }
  )

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote:', content)
    anecdoteMutation.mutate(content)
    setNotification(`You created '${content}'`)
    // dispatch({type: "SUCCESS", data: `You created '${content}'`})

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
