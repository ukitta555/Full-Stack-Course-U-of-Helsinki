const mongoose = require ('mongoose')
const supertest = require ('supertest')
const app = require ('../app')
const Blog = require ('../models/blog')
const helper = require ('./test_helper')
const api = supertest(app)



beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('GET request returns data in json', async () => {
  const blogsInDB = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(blogsInDB.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the reaturned blogs', async() => {
  const response = await api.get('/api/blogs')

  const expectedTitle = 'Problems are opportunities'

  const titles = response.body.map(blog => blog.title)
  expect(titles).toContain(expectedTitle)
})

test('blog object has property \'id\' instead of \'_id\'', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('POST request adds the new blog to the DB', async () => {
  const newBlog = {
    author: '123',
    title: '234',
    likes: 123,
    url: 'qwe'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterInsert = await helper.blogsInDB()

  expect (blogsAfterInsert).toHaveLength(helper.initialBlogs.length + 1)

  const blogsContent = blogsAfterInsert.map( blog => {return {
    author: blog.author,
    title: blog.title,
    url: blog.url,
    likes: blog.likes
  }})
  expect (blogsContent).toContainEqual(newBlog)
})

afterAll(() => {
  mongoose.connection.close()
})