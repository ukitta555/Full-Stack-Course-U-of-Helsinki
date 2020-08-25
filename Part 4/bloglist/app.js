const config = require('./utils/config')
const express = require('express')
const blogsRouter = require ('./controllers/blogs')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/logger')



app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {logger.info ('connected to MongoDB')})
  .catch( error => {logger.error('error while connecting to Mongo:', error.message)})


module.exports = app