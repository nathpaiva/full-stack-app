import express from 'express'

import { errorResolver } from '../helpers'
import { CanonicalCollection } from '../models/Canonical'

const canonicalRouter = express.Router()

canonicalRouter.get('/api/canonical', async (req, res) => {
  try {
    const result = await CanonicalCollection.find()

    return res.json({
      success: true,
      result,
    })
  } catch (error) {
    return errorResolver(req, res, error as Error)
  }
})

canonicalRouter.post('/api/canonical', async (req, res) => {
  try {
    const {
      url,
      spam_score,
      matching_target_indexes,
      matching_source_urls,
      domain_authority,
    } = req.body as ICanonical

    if (!url) {
      throw new Error('URL is required')
    }
    const canonicalInstance = new CanonicalCollection({
      url,
      spam_score,
      matching_target_indexes,
      matching_source_urls,
      domain_authority,
    })

    const data = await canonicalInstance.save()

    res.json({
      success: true,
      data,
    })
  } catch (error) {
    return errorResolver(req, res, error as Error)
  }
})

export { canonicalRouter }
