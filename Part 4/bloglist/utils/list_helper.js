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

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog
}