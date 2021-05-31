require('dotenv').config()

const SECRETS = {
  JWT_SECRET: process.env.JWT_SECRET,
  MONGO_URI: process.env.MONGO_URI
}

module.exports = SECRETS