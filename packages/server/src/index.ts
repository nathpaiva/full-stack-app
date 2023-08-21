import { json } from 'body-parser'
import express from 'express'

import mongoConnect from './models'
import { canonicalRouter } from './routes'

// set express to the app
const app = express()

// set json body parse
app.use(json())

// set CORS config
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:2000')

  next()
})

// create the routes
app.use('/api', canonicalRouter)

// connect with the DB
mongoConnect()

// open the connection
app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
