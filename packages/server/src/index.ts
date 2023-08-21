import { json } from 'body-parser'
import cors from 'cors'
import express from 'express'
import fileUpload from 'express-fileupload'

import mongoConnect from './models'
import { canonicalRouter } from './routes'

// set express to the app
const app = express()

// set file upload
app.use(fileUpload())
// set json body parse
app.use(json())
// set CORS config
app.use(cors())
// create the routes
app.use('/api', canonicalRouter)

// connect with the DB
mongoConnect()

// open the connection
app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
