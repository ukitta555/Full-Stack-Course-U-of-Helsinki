const initialState = 'Nothing happened yet...'

export const showNotification = (content) => {
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