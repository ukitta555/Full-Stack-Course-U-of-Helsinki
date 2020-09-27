const bcrypt = require('bcrypt')
const usersRouter = require ('express').Router()
const User = require ('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const passwordHash = await bcrypt.hash(body.password, 10)

  const user = new User ({
    username: body.username,
    name: body.name,
    password: passwordHash
  })

  await user.save()

  response.json(user)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json (users)
})
module.exports = usersRouter
