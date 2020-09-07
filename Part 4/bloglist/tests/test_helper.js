const Blog = require ('../models/blog')
const initialBlogs = [
  {
    title: '10 reasons why you should get a job',
    author: 'Your conscience',
    url: 'yourbrain.com',
    likes: 1
  },
  {
    title: 'Problems are opportunities',
    author: 'Tina Silig',
    url: 'yourpurpose.com',
    likes: 2

  },
  {
    title: 'The solution to your problems are where you haven\'t looked yet',
    author: 'Jordan Peterson',
    url: 'lifeadvice.com',
    likes: 2
  }
]

const nonExistingId = () => {
  const blog = new Blog ({
    title: 'toremove',
    author: 'JEST',
    url: 'testingsucks.com',
    likes: 100
  })
  return blog._id.toString()
}

const blogsInDB = async () => {
  const blogs = Blog.find({})
  //return blogs.map(blog => JSON.stringify(blog))
  return blogs
}

module.exports = { initialBlogs, nonExistingId, blogsInDB }