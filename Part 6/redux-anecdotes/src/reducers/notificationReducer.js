const initialState = 'Nothing happened yet...'

export const showNotification = (content) => {
  return {
    type: 'SHOW_NOTIFICATION',
    newNotification: content
  }
}



const notificationReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action: ', action.type)
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.newNotification
    default:
      return state
  }
}

export default notificationReducer