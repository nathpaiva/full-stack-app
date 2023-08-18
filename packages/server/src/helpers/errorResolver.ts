import { Request, Response } from 'express'

export const errorResolver = (req: Request, res: Response, error: Error) => {
  const status = req.statusCode || 400

  return res.status(status).json({
    success: false,
    message: error.message,
  })
}
