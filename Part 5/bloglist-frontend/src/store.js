import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/NotificationReducer'

const store = createStore(
  notificationReducer,
  applyMiddleware(thunk)
)

export default store