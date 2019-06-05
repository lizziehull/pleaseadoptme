const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const serveStatic = require('serve-static')

const app = express()
app.use(serveStatic(__dirname + '/dist'))
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

require('./passport')

require('./routes')(app)

// Force is set to false for reseeding to work properly.
sequelize.sync({force: false})
.then(() => {
  app.listen(config.port)
  console.log(`Server started on port ${config.port}`)
})
