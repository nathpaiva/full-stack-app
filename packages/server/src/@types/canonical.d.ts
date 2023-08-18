interface ICanonicalController {
  get: (req: Request, res: Response) => void
  post: (req: Request, res: Response) => void
}

interface ICanonical {
  url: string
  spam_score?: number
  matching_target_indexes?: number[]
  matching_source_urls?: {
    url: string
    page_authority: number
  }[]
  domain_authority?: number
}
