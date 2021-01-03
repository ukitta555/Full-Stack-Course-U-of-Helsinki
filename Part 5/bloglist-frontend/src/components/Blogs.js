import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Blog from './Blog'
import {getBlogs, likeBlogAndSort, removeBlog, sortBlogs} from '../reducers/BlogsReducer'


// dispatching actions that change the state causes components to re-render
const Blogs = () =>
{
  let blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()


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
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleRemoveClick = {handleRemoveClick}
            handleLikeClick = {handleLikeClick}
          />
        )
      }
    </div>
  )
}

export default Blogs