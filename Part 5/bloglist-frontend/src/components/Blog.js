import React from 'react'
import Comments from './Comments'
import BlogInfo from './BlogInfo'
import CommentForm from './CommentForm'
import {Link} from 'react-router-dom'


const Blog = ({ blog, view }) =>
{
  if (!blog) {
    return null
  }

  const blogShortStyle =
  {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }




  return (
    <>
      {
        view === 'oneBlog'
          ?
          <div className = 'blog'>
            <h2> {blog.title} by {blog.author} </h2>
            <BlogInfo blog = {blog} view = {view}/>
            <CommentForm blog = {blog} />
            <Comments comments = {blog.comments}/>
          </div>
          :
          <div style = {blogShortStyle}  className = 'blog'>
            <Link to = {`/blogs/${blog.id}`}>{blog.title} by {blog.author} </Link>
          </div>
      }
    </>
  )
}

export default Blog
