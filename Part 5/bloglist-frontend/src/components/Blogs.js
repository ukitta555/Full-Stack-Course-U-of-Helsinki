import React, {useEffect} from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({user, setUser, blogs, setBlogs}) => {
  const logOut = () =>
  {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  useEffect(() =>
  {
    const fetchData = async () =>
    {
      const blogsFromDB = await blogService.getAll()
      setBlogs(blogsFromDB)
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
          blogs = {blogs}
          setBlogs = {setBlogs}
           />
        )
      }
    </div>
  )
}

export default Blogs