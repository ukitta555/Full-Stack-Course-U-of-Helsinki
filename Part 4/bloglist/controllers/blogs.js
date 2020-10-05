const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require ('../models/blog')
const User = require ('../models/user')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.status(200).json(allBlogs)
})

/*
const getTokenFrom = request => {
  const authorization = request.get ('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer '))
  {
    return authorization.substring(7)
  }
  return null
}
*/

blogsRouter.post('/', async (request, response) => {
  if (typeof request.body.likes === 'undefined')
  {
    request.body.likes = 0
  }

  const body = request.body

  const user = jwt.verify (request.token, process.env.SECRET)

  if (!request.token || !user)
  {
    return response.status(401).json({ error: 'No JWT token/token is invalid' })
  }
  const author  = await User.findById(user.id)

  const newBlog = {
    ...body,
    user: author._id
  }

  const blog = new Blog(newBlog)

  author.blogs = author.blogs.concat(blog._id)
  await User.findByIdAndUpdate(author._id, author)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify (request.token, process.env.SECRET)
  const user = await User.findOne({ username: decodedToken.username })

  const blogToDelete = user.blogs.filter( blog => {
    return (blog.toString() === request.params.id.toString())
  })

  // if there is no user, the token is invalid or the user didn't create this blog
  if (!user || !decodedToken || blogToDelete.length === 0)
  {
    return response.status(401).json({ error: 'invalid token / wrong user' })
  }

  const blogsForUpdatedUser = user.blogs.filter( blog => {
    return !(blog.toString() === request.params.id.toString())
  })


  const updatedUser = {
    ...user._doc,
    blogs: blogsForUpdatedUser
  }

  await User.findByIdAndUpdate(decodedToken.id, updatedUser)
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body

  const updatedBlogWithID = await Blog
    .findByIdAndUpdate(request.params.id, updatedBlog, { new: true })

  if (updatedBlogWithID) {
    response.status(204).json(updatedBlogWithID)
  }
  else
  {
    response.status(404).end()
  }
})

module.exports = blogsRouter