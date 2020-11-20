import React, {useEffect} from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({user, setUser, blogs, setBlogs}) => {
  const logOut = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      <span>{user.name} logged in</span>
      {
        blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      }
      <button type="button" onClick = {logOut}> logout </button>
    </div>
  )
}

export default Blogs