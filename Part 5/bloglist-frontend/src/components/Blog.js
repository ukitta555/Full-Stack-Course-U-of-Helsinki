import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useHistory} from 'react-router-dom'
import { removeBlog, likeBlogAndSort} from '../reducers/BlogsReducer'

const Blog = ({ blog, view }) =>
{
  const history = useHistory()
  const user = useSelector (state => state.user)
  const dispatch = useDispatch ()
  if (!blog) {
    return null
  }

  const blogShortStyle =
  {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

  const removeButtonDisplay = (blog.user.name === user.name)
    ? { display : '' }
    : { display : 'none' }


  const Info = (
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


  return (
    <>
      {
        view === 'oneBlog'
          ?
          <div className = 'blog'>
            <h2> {blog.title} by {blog.author} </h2>
            <div>
              {
                Info
              }
            </div>
          </div>
          :
          <div style = {blogShortStyle}  className = 'blog'>
            <Link to = {`/blogs/${blog.id}`}>{blog.title} by {blog.author} </Link>
          </div>
      }
    </>
  )
}

export default Blog
