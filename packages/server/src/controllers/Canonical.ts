import { errorResolver } from '../helpers'
import { CanonicalCollection } from '../models/Canonical'

export const canonical: ICanonicalController = {
  get: async (req, res) => {
    try {
      const result = await CanonicalCollection.find()

      return res.json({
        success: true,
        result,
      })
    } catch (error) {
      return errorResolver(req, res, error as Error)
    }
  },
  post: async (req, res) => {
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
  },
  post_csv: async (req, res) => {
    try {
      const { name } = req.body
      const { file } = req.files
      console.log('=>', { file, name })

      res.json({
        success: true,
      })
    } catch (error) {
      return errorResolver(req, res, error as Error)
    }
  },
}
