import { Response } from 'express';
const ERROR_HANDLERS = {
    JsonWebTokenError: (res: Response) =>
      res.status(401).json({ error: 'token missing or invalid' }),
  
    TokenExpirerError: (res: Response) =>
      res.status(401).json({ error: 'token expired' }),
  
    defaultError: (res: Response, error: Error) => {
      console.error(error.name)
      res.status(500).end()
    }
  }
  
  module.exports = (error: Error, response: Response ) => {
    const handler =
      ERROR_HANDLERS[error.name as keyof typeof ERROR_HANDLERS] || ERROR_HANDLERS.defaultError
  
    handler(response, error)
  }