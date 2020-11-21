import React, {useState} from 'react'
import blogService from '../services/blogs'
import cloneDeep from 'lodash/cloneDeep'

const Blog = ({ blog, blogs, setBlogs, sortBlogsByLikes }) => {
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

  const handleLikeClick =  async (blogToUpdate) => {
    const updatedBlog = await blogService.updateBlog(blogToUpdate)
    console.log(updatedBlog)
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
