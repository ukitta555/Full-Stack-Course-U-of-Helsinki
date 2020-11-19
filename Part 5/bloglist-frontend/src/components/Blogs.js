import React from 'react'
import Blog from './Blog'


const Blogs = ({blogs, user, setUser}) => {
  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }
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