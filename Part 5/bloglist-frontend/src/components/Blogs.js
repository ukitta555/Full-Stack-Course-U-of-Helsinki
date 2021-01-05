import React from 'react'
import {useSelector} from 'react-redux'
import Blog from './Blog'

// dispatching actions that change the state causes components to re-render
const Blogs = () =>
{
  const blogs = useSelector(state => state.blogs)

  return (
    <div id = 'blogs'>
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )
      }
    </div>
  )
}

export default Blogs