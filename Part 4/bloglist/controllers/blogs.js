const blogsRouter = require('express').Router()
const Blog = require ('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const allBlogs = await Blog.find({})
  response.status(200).json(allBlogs)
})


blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch (error => next(error))
})

module.exports = blogsRouter