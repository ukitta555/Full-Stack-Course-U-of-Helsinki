import {hideNotification} from './notifVisibilityReducer'

const initialState = 'Nothing happened yet...'


export const setNotification = (content, seconds) => {
  console.log('inside setNotification:', content, seconds)
  return async dispatch => {
    dispatch(showNotification(content))
    await setTimeout(() => {
      dispatch(hideNotification())
    }, seconds * 1000)
  }
}

const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    newNotification: content
  }
}



const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.newNotification
    default:
      return state
  }
}

export default notificationReducer