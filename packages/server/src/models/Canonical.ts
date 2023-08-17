import mongoose from 'mongoose'

const canonicalSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  spam_score: {
    type: Number,
    required: false,
  },
  matching_target_indexes: {
    type: [Number],
    required: false,
  },
  matching_source_urls: {
    type: [
      {
        url: String,
        page_authority: Number,
      },
    ],
    required: false,
  },
  domain_authority: {
    type: Number,
    required: false,
  },
})

const Canonical = mongoose.model('Canonical', canonicalSchema)

export { Canonical }
