const initialState = {
  content: 'Nothing happened yet...',
  visibility: false,
  timeoutID: null
 }


export const setNotification = (content, seconds) => {
  console.log('inside setNotification:', content, seconds)
  return (dispatch, getState) => {

    let state = getState()
    console.log(state)

    if (state.notification.timeoutID !== null) {
      window.clearTimeout(state.notification.timeoutID)
    }

    dispatch(showNotification(content))

    const timeoutID = window.setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)

    dispatch(setTimeoutID(timeoutID))

    console.log(timeoutID)

    state = getState()
    console.log(state)
  }
}



const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    newNotification: content
  }
}

const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}

const setTimeoutID = (id) => {
  return {
    type: 'SET_TIMEOUT_ID',
    timeoutID: id
  }
}


const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        content: action.newNotification,
        visibility: true
      }
    case 'SET_TIMEOUT_ID':
      console.log('inside')
      return {
        ...state,
        timeoutID: action.timeoutID
      }
    case 'HIDE_NOTIFICATION':
      return {
        content: null,
        visibility: false,
        timeoutID: null
      }
    default:
      return state
  }
}

export default notificationReducer