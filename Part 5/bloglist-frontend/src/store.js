import { applyMiddleware, createStore, combineReducers } from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import notificationReducer from './reducers/NotificationReducer'
import blogsReducer from './reducers/BlogsReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export default store