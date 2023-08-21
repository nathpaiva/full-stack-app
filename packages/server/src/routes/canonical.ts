import express from 'express'

import { canonical } from '../controllers'

const canonicalRouter = express.Router()

canonicalRouter.get('/canonical', canonical.get)
canonicalRouter.post('/canonical', canonical.post)
canonicalRouter.post('/canonical/csv', canonical.post_csv)

export { canonicalRouter }
