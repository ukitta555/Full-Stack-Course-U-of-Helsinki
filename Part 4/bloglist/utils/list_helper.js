const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(blog => blog.likes)
    .reduce((sum, likesForBlog) => sum + likesForBlog, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const formattedBlogs = blogs.map (blog => {
    return {
      title: blog.title,
      author: blog.author,
      likes: blog.likes
    }
  })
  return formattedBlogs [
    formattedBlogs
      .map(blog => blog.likes)
      .reduce((iMax, curBlogLikes, i, likesArray) => {
        return (curBlogLikes > likesArray[iMax] ? i : iMax)
      }, 0)
  ]
}

// implement mostBlogs
// https://stackoverflow.com/questions/37251765/lodash-count-values-from-array-of-objects
// https://lodash.com/docs/4.17.15
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const authorBlogMap = _.countBy(blogs, 'author')
  const authorOfMostBlogs =_.maxBy(Object.keys(authorBlogMap), (author) => {
    return authorBlogMap[author]
  })
  return (
    {
      author: authorOfMostBlogs,
      blogs: authorBlogMap[authorOfMostBlogs]
    }
  )
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs
}