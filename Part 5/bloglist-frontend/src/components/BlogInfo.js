import React from 'react'
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { removeBlog, likeBlogAndSort} from '../reducers/BlogsReducer'

const BlogInfo = ({blog, view}) => {
  const history = useHistory()
  const dispatch = useDispatch ()

  const user = useSelector (state => state.user)
  const removeButtonDisplay = (blog.user.name === user.name)
    ? { display : '' }
    : { display : 'none' }

  const handleRemoveClick = async (blogToRemove) =>
  {
    dispatch(removeBlog(blogToRemove))
    if (view === 'oneBlog') {
      history.push('/')
    }
  }

  const handleLikeClick =  async (blogToUpdate) =>
  {
    dispatch(likeBlogAndSort(blogToUpdate))
  }


  return (
    <div>
      <p>
        URL: <a href = {blog.url}> {blog.url} </a>
      </p>
      <p className = 'blogLikes'>
        Likes: {blog.likes}
        <button
          onClick = {() => handleLikeClick(blog)}
          className = 'likeButton'
        >
          like
        </button>
      </p>
      <p>
        Created by: {blog.user.name}
      </p>
      <button
        onClick = {() => handleRemoveClick(blog)}
        style = {removeButtonDisplay}
        className = 'removeButton'
      >
        remove
      </button>
    </div>
  )
}

export default BlogInfo