const commentRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')

commentRouter.get('/', async (request, response) => {
  const comments =  await Comment.find({})
  response.status(200).json(comments)
})

commentRouter.post ('/', async (request, response) => {
  const body = request.body
  const blog = await Blog.findById(body.id)

  const comment = {
    content: body.comment,
    blog: blog._id
  }
  console.log('Comment', comment)
  const commentDocument = new Comment(comment)

  blog.comments = blog.comments.concat(commentDocument._id)

  console.log('Blog', blog)
  await Blog.findByIdAndUpdate(blog._id, blog)

  const savedComment = await commentDocument.save()

  response.status(201).json(savedComment)
})

module.exports = commentRouter