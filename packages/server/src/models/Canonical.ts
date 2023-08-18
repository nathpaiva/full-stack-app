import mongoose from 'mongoose'

const canonicalSchema = new mongoose.Schema<ICanonical>({
  url: {
    type: String,
    required: true,
  },
  spam_score: {
    type: Number,
    required: false,
    default: null,
  },
  matching_target_indexes: {
    type: [Number],
    required: false,
    default: [],
  },
  matching_source_urls: {
    type: [
      {
        url: String,
        page_authority: Number,
      },
    ],
    required: false,
    default: [],
  },
  domain_authority: {
    type: Number,
    required: false,
    default: null,
  },
})

const CanonicalCollection = mongoose.model('Canonical', canonicalSchema)

export { CanonicalCollection }
