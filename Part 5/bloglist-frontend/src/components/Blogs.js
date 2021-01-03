import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import {getBlogs, likeBlogAndSort, removeBlog, sortBlogs} from '../reducers/BlogsReducer'
import {setUser} from '../reducers/UserReducer'

// dispatching actions that change the state causes components to re-render
const Blogs = () =>
{
  let blogs = useSelector(state => state.blogs)
  const user = useSelector (state => state.user)
  const dispatch = useDispatch()
  const logOut = () =>
  {
    dispatch(setUser(null))
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const handleRemoveClick = async (blogToRemove) =>
  {
    dispatch(removeBlog(blogToRemove))
  }

  const handleLikeClick =  async (blogToUpdate) =>
  {
    dispatch(likeBlogAndSort(blogToUpdate))
  }

  useEffect(() =>
  {
    async function fetchData()  {
      await dispatch(getBlogs())
      dispatch(sortBlogs())
    }
    fetchData()
  }, [])


  return (
    <div id = 'blogs'>
      <div>
        <p>
          {user.name} logged in
          <button
            type="button"
            onClick = {logOut}
            id = 'logoutButton'
          >
            logout
          </button>
        </p>
      </div>
      <h2>blogs</h2>
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleRemoveClick = {handleRemoveClick}
            handleLikeClick = {handleLikeClick}
            user = {user}
          />
        )
      }
    </div>
  )
}

export default Blogs