import { json } from 'body-parser'
import express from 'express'

import mongoConnect from './models'
import { userRouter } from './routes'

const app = express()

app.use(json())

app.use(userRouter)

mongoConnect()

app.listen(3000, () => {
  console.log('server is listening on port 3000')
})
