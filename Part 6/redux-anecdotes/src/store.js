import { combineReducers, createStore } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import notifVisibilityReducer from './reducers/notifVisibilityReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import filterReducer from './reducers/filterReducer'

const reducer = combineReducers({
  notification: notificationReducer,
  anecdotes: anecdoteReducer,
  isNotificationVisible: notifVisibilityReducer,
  filter: filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
  )

console.log(store.getState())

export default store