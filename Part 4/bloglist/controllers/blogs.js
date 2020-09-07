const blogsRouter = require('express').Router()
const Blog = require ('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.status(200).json(allBlogs)
})


blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter