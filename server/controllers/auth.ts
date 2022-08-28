import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import _ from 'lodash';
import { ACCESS_TOKEN_DURATION, REFRESH_TOKEN_DURATION } from '../utils/token';

const authController = {
  async signup(req: Request, res: Response) {
    const { full_name, password, email } = req.body;

    if (!password || !email)
      return res.status(400).json({ msg: 'Email and password is required' });

    // check for duplicate emails in the db
    let user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(409).json({ msg: 'Email already taken' });
    }

    try {
      // encrypt the password
      const hashedPw: string = await bcrypt.hash(password, 10);

      // store the user
      user = await prisma.user.create({
        data: {
          password: hashedPw,
          full_name,
          email,
        },
      });

      const returnedUser = _.omit(user, 'password');

      return res.status(201).json({
        msg: 'New user created',
        user: returnedUser,
      });
    } catch (error: any) {
      return res.status(500).json({
        msg: error.message || 'Something went wrong, please try again',
      });
    }
  },
  async login(req: any, res: Response) {
    const { password, email } = req.body;

    if (!password || !email)
      return res.status(400).json({ msg: 'Email and password is required' });

    // check for duplicate emails in the db
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ msg: 'Email or password is not correct' });
    }

    // check password valid
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Email or password is not correct' });
    }

    // create jwt
    const access_token = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET || '',
      { expiresIn: ACCESS_TOKEN_DURATION }
    );
    const refresh_token = jwt.sign(
      { id: user.id },
      process.env.REFRESH_TOKEN_SECRET || '',
      { expiresIn: REFRESH_TOKEN_DURATION }
    );

    const returnedUser = _.omit(user, 'password');

    // save refresh token to logged in user
    await prisma.user.update({
      where: { id: user.id },
      data: {
        refresh_token,
      },
    });

    res.cookie('jwt', refresh_token, {
      // secure: process.env.NODE_ENV !== 'development',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return res.json({
      msg: 'Login success',
      user: returnedUser,
      access_token,
    });
  },
  async refreshToken(req: any, res: Response) {
    const cookies = req.cookies;
    console.log({ cookies });
    if (!cookies?.jwt)
      return res.status(401).json({ msg: 'Refresh token not provided' });

    const refresh_token = cookies.jwt;
    const user = await prisma.user.findFirst({ where: { refresh_token } });
    if (!user)
      return res
        .status(403)
        .json({ msg: 'Can not find user with this refresh token' });

    // check refresh token valid
    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRET || '',
      async (err: any, decoded: any) => {
        if (err || decoded.id !== user.id) {
          return res.status(403).json({ msg: 'Refresk token not valid' });
        }

        const new_access_token = jwt.sign(
          { id: user.id },
          process.env.ACCESS_TOKEN_SECRET || '',
          {
            expiresIn: ACCESS_TOKEN_DURATION,
          }
        );

        return res.json({
          msg: 'Renew access token success',
          access_token: new_access_token,
        });
      }
    );
  },
  async logout(req: Request, res: Response) {
    // on client, also delete the access token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);

    const refresh_token = cookies.jwt;

    const user = await prisma.user.findFirst({ where: { refresh_token } });
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      return res.sendStatus(204);
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        refresh_token: null,
      },
    });

    res.clearCookie('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.sendStatus(204);
  },
};

export default authController;
