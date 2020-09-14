const blogsRouter = require('express').Router()
const Blog = require ('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.status(200).json(allBlogs)
})


blogsRouter.post('/', async (request, response) => {
  if (typeof request.body.likes === 'undefined')
  {
    request.body.likes = 0
  }
  const blog = new Blog(request.body)

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

  response.status(204).json(updatedBlogWithID)
})

module.exports = blogsRouter