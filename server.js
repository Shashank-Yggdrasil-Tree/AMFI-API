var express = require('express')
var rateLimit = require('express-rate-limit')
var app = express()

var api = require('./index')

app.use('/', api)
app.use(express.json())

// GLOBAL MIDDLEWARE

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  handler: (req, res) => {
      res.status(429).send('Too many request, please try again in an hour')
  },
})

app.use('/', limiter)

app.listen(process.env.PORT || 8080)