import blogService from '../services/blogs'
import cloneDeep from 'lodash/cloneDeep'
const initialState = []


const getBlogsAction = (blogs) => {
  return {
    type: 'GET_BLOGS',
    blogs
  }
}

const createBlogAction = (newBlog) => {
  return {
    type: 'CREATE_BLOG',
    newBlog
  }
}

const sortBlogsAction = () => {
  return {
    type: 'SORT_BLOGS'
  }
}

export const sortBlogs = () => {
  return dispatch => {
    dispatch(sortBlogsAction())
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(getBlogsAction(blogs))
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    const blogFromDB = await blogService.createBlog(newBlog)
    dispatch(createBlogAction(blogFromDB))
  }
}

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BLOGS':
      return action.blogs
    case 'CREATE_BLOG':
      return state.concat(action.newBlog)
    case 'SORT_BLOGS': {
      const stateCopy = cloneDeep(state)
      return stateCopy.sort((a, b) => - a.likes + b.likes)
    }
    default:
      return state
  }
}

export default blogsReducer