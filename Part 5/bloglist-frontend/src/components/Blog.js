import React, {useState} from 'react'
import blogService from '../services/blogs'
import cloneDeep from 'lodash/cloneDeep'

const Blog = ({ blog, blogs, setBlogs, sortBlogsByLikes, user }) => {
  const [isInformationHidden, setIsInformationHidden] = useState (true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleInforamtion = () => {
    setIsInformationHidden(!isInformationHidden)
  }

  const handleRemoveClick = async (blogToRemove) => {
    try {
        if (window.confirm(`Do you really want to delete '${blogToRemove.title}'?`))
        {
          await blogService.deleteBlog(blogToRemove)
          const index = blogs.findIndex(
            blog => blogToRemove.id.toString() === blog.id.toString()
          )
          const blogsCopy = cloneDeep(blogs)
          blogsCopy.splice(index, 1)
          setBlogs(blogsCopy)
        }
    }
    catch (exception) {
      console.log(exception)
    }
  }

  const handleLikeClick =  async (blogToUpdate) => {
    const updatedBlog = await blogService.updateBlog(blogToUpdate)
    updateBlogs(updatedBlog)
    blog = updatedBlog
  }

  const updateBlogs = (updatedBlog) => {
    const index = blogs.findIndex(
      blog =>
      {
        return blog.id.toString() === updatedBlog.id.toString()
      }
    )
    const blogsCopy = cloneDeep(blogs)
    blogsCopy[index] = updatedBlog
    setBlogs(sortBlogsByLikes(blogsCopy))
  }

  const removeButtonDisplay = (blog.user.name === user.name)
    ? {display : ''}
    : {display : 'none'}


  const Info = (
    <div>
      <p>
        URL: {blog.url}
      </p>
      <p>
        Likes: {blog.likes}
        <button onClick = {() => handleLikeClick(blog)}> like </button>
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
  <div style = {blogStyle}>
    {blog.title} {blog.author}
    <button onClick = {toggleInforamtion}> view </button>
    <div>
    {
      isInformationHidden ? '' : Info
    }
    </div>
  </div>
  )
}

export default Blog
