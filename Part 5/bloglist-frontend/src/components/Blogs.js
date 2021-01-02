import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Blog from './Blog'
import blogService from '../services/blogs'
import {getBlogs, sortBlogs} from '../reducers/BlogsReducer'
import cloneDeep from 'lodash/cloneDeep'


// dispatching actions that change the state causes components to re-render
const Blogs = ({ user, setUser}) =>
{
  let blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()
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

  // TODO
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
        blogs = blogsCopy
      }
    }
    catch (exception)
    {
      console.log(exception)
    }
  }
  // TODO
  const handleLikeClick =  async (blogToUpdate) =>
  {
    const updatedBlog = await blogService.updateBlog(blogToUpdate)
    updateBlogs(updatedBlog)
  }


  // TODO
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
    blogs = sortBlogsByLikes(blogsCopy)
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