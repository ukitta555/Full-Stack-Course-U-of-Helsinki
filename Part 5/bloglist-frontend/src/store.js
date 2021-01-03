import { applyMiddleware, createStore, combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/NotificationReducer'
import blogsReducer from './reducers/BlogsReducer'
import userReducer from './reducers/UserReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  user: userReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store