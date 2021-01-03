import React, { useState } from 'react'
import {useSelector} from 'react-redux'

const Blog = ({ blog, handleLikeClick, handleRemoveClick }) =>
{
  const user = useSelector (state => state.user)
  const [isInformationHidden, setIsInformationHidden] = useState (true)

  const blogStyle =
  {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleInforamtion = () =>
  {
    setIsInformationHidden(!isInformationHidden)
  }


  const removeButtonDisplay = (blog.user.name === user.name)
    ? { display : '' }
    : { display : 'none' }


  const Info = (
    <div>
      <p>
        URL: {blog.url}
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
    <div style = {blogStyle} className = 'blog'>
      {blog.title} {blog.author}
      <button
        onClick = {toggleInforamtion}
        className = 'viewButton'
      >
         view
      </button>
      <div>
        {
          isInformationHidden ? '' : Info
        }
      </div>
    </div>
  )
}

export default Blog
