const initialState = false


export const hideNotification = () => {
  return {
    type: 'HIDE_NOTIFICATION'
  }
}


const notifVisibilityReducer = (state = initialState, action) => {
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