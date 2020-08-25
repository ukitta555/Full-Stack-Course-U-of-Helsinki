const http = require('http')
const express = require('express')
const blogsRouter = require ('./controllers/blogs')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const logger = require('./utils/logger')
const config = require('./utils/config')


app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })




app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})