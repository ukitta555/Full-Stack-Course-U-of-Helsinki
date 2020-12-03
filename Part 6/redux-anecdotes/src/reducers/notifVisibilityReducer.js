const initialState = false


export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}


const notifVisibilityReducer = (state = initialState, action) => {
  console.log('state: ', state)
  console.log('action: ', action.type)
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return true
    case 'HIDE_NOTIFICATION':
      return false
    default:
      return state
  }
}

export default notifVisibilityReducer