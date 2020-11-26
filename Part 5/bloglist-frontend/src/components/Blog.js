import React, { useState } from 'react'

const Blog = ({ blog, handleLikeClick, handleRemoveClick, user }) =>
{
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
      <p>
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
      >
        remove
      </button>
    </div>
  )


  return (
    <div style = {blogStyle}  className = "blog">
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
