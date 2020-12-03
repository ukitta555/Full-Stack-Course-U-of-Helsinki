const initialState = ''

export const changeFilter = (newValue) => {
  return {
    type: 'CHANGE_FILTER',
    newValue
  }
}

const filterReducer = (state = initialState, action) => {
  switch (action.type)
  {
    case 'CHANGE_FILTER':
      return action.newValue
    default:
      return state
  }
}

export default filterReducer