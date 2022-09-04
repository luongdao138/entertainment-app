import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import prisma from '../config/prisma';

const verifyTokenMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'Access token not provided' });

  const token = authHeader.replace('Bearer ', '');
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || '',
    async (err: any, decoded: any) => {
      if (err) {
        return res.status(403).json({ msg: 'Access token invalid' });
      }

      const user = await prisma.user.findFirst({
        where: { id: decoded.id, is_deleted: false, is_verified: true },
      });
      if (!user) {
        return res.status(403).json({ msg: 'Access token invalid' });
      }
      req.user = _.omit(user, 'password');
      next();
    }
  );
};

export default verifyTokenMiddleware;
