import { Request, Response, NextFunction } from 'express';

const ERROR_HANDLERS = {
  JsonWebTokenError: (res: Response) =>
    res.status(401).json({ error: 'token missing or invalid' }),

  TokenExpiredError: (res: Response) =>
    res.status(401).json({ error: 'token expired' }),

  InvalidCredentialsError: (res: Response, error: Error) =>
    res.status(401).json({ error: error.message }),

  UsuarioExistenteError: (res: Response, error: Error) =>
    res.status(409).json({ error: error.message }),

  UsuarioEliminadoError: (res: Response, error: Error) =>
    res.status(403).json({ error: error.message }), 

  defaultError: (res: Response, error: Error) => {
    console.error("Unhandled error:", error.name, error.message); // Log para depuración
    res.status(500).json({ error: 'internal server error' });
  },
};

module.exports = (error: Error, _req: Request, res: Response, _next: NextFunction) => {
  const handler =
    ERROR_HANDLERS[error.name as keyof typeof ERROR_HANDLERS] || ERROR_HANDLERS.defaultError;

  handler(res, error);
};