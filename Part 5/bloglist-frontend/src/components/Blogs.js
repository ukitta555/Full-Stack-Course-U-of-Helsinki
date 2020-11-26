import React, { useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import cloneDeep from 'lodash/cloneDeep'

const Blogs = ({ user, setUser, blogs, setBlogs }) =>
{
  const logOut = () =>
  {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const sortBlogsByLikes = (blogs) =>
  {
    const blogsCopy = cloneDeep(blogs)
    return blogsCopy.sort((a, b) => - a.likes + b.likes)
  }

  const handleRemoveClick = async (blogToRemove) =>
  {
    try
    {
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
    catch (exception)
    {
      console.log(exception)
    }
  }

  const handleLikeClick =  async (blogToUpdate) =>
  {
    const updatedBlog = await blogService.updateBlog(blogToUpdate)
    updateBlogs(updatedBlog)
  }

  const updateBlogs = (updatedBlog) =>
  {
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

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const blogsFromDB = await blogService.getAll()
      setBlogs(sortBlogsByLikes(blogsFromDB))
    }
    fetchData()
  }, [setBlogs])


  return (
    <div>
      <div>
        <p>
          {user.name} logged in
          <button type="button" onClick = {logOut}> logout </button>
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