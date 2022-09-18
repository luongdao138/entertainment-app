import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import prisma from '../config/prisma';

const verifyNoTokenMiddleware = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers['authorization'];

  if (authHeader) {
    const token = authHeader.replace('Bearer ', '');
    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET || '',
      async (err: any, decoded: any) => {
        if (!err) {
          const user = await prisma.user.findFirst({
            where: { id: decoded.id, is_deleted: false, is_verified: true },
          });
          if (user) {
            req.user = _.omit(user, 'password');
          }

          next();
        } else {
          next();
        }
      }
    );
  } else {
    next();
  }
};

export default verifyNoTokenMiddleware;
