import { NextFunction, Request, Response } from 'express';
import allowedOrigins from '../utils/allowOrigin';

const credentialMiddleware = (req: any, res: any, next: NextFunction) => {
  const origin = req.headers.origin as string;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

export default credentialMiddleware;
