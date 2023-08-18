import { json } from 'body-parser'
import express from 'express'

import mongoConnect from './models'
import { canonicalRouter } from './routes'

const app = express()

app.use(json())

app.use('/api', canonicalRouter)

mongoConnect()

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
