import React, {useEffect} from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import cloneDeep from 'lodash/cloneDeep'

const Blogs = ({user, setUser, blogs, setBlogs}) => {
  const logOut = () =>
  {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const sortBlogsByLikes = (blogs) => {
    const blogsCopy = cloneDeep(blogs)
    return blogsCopy.sort((a, b) => - a.likes + b.likes)
  }

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const blogsFromDB = await blogService.getAll()
      setBlogs(sortBlogsByLikes(blogsFromDB))
    }
    fetchData()
  }, [])

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
          blogs = {blogs}
          setBlogs = {setBlogs}
          sortBlogsByLikes = {sortBlogsByLikes}
           />
        )
      }
    </div>
  )
}

export default Blogs