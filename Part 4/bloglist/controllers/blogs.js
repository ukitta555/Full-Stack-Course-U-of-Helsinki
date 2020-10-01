const blogsRouter = require('express').Router()
const Blog = require ('../models/blog')
const User = require ('../models/user')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.status(200).json(allBlogs)
})


blogsRouter.post('/', async (request, response) => {
  if (typeof request.body.likes === 'undefined')
  {
    request.body.likes = 0
  }

  const body = request.body

  const users = await User.find({})

  const author = users[0]

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