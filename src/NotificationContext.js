import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
        state = action.data
        return state
    case "CLEAR":
        setTimeout(() => {
        }, action.timeout)
        state = null
        return state
    default:
        return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, null)

    /**
     * @description set notification message and clear after timeout
     * @param {message} notification - message to display 
     * @param {timeout} timeout - before clearing notification
     * @returns {void}
     */
    const setNotification = (message, timeout=5000) => {
        notificationDispatch({type: "SUCCESS", data: message})
        setTimeout((timeout) => {
            notificationDispatch({type: "CLEAR"})
        }, timeout)
    }

    return (
    <NotificationContext.Provider value={{state: [notification, notificationDispatch], setNotification}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

// custom hook helpers
export const useNotification = () => {
    const context = useContext(NotificationContext)
    console.debug('notification 🚨', context.state[0])
    return context.state[0]
}

export const useNotificationDispatch = () => {
    console.debug('notification dispatch 🚨', )
    const context = useContext(NotificationContext)
    return context.state[1]
}

export const useNotificationSetter = () => {
    console.debug('notification setter 🎵')
    const context = useContext(NotificationContext)
    return context.setNotification
}

// const clearNotification = (timeout=1000) => {
//     // wait 5 seconds and clear notification
//     setTimeout(() => {
//     const dispatch = useContext(NotificationContext)[1]
//     dispatch({type: "CLEAR"})
//     }, timeout)
// }


export default NotificationContext