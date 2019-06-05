const path = require('path')

// Configuration for database and authentication.
module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DB_NAME || 'adoptme',
    user: process.env.DB_USER || 'adoptme',
    password: process.env.DB_PASSWORD || 'adoptme',
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'localhost',
      storage: path.resolve(__dirname, '../../adoptme.sqlite')
    }
  },
  authentication: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
