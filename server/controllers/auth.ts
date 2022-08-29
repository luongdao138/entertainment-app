import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import _ from 'lodash';
import {
  ACCESS_TOKEN_DURATION,
  REFRESH_TOKEN_DURATION,
  VERIFY_ACCOUNT_TOKEN_DURATION,
} from '../utils/token';
import sendMail from '../utils/sendEmail';

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
      const verify_token = jwt.sign(
        { id: user.id },
        process.env.VERIFY_ACCOUNT_SECRET || '',
        { expiresIn: VERIFY_ACCOUNT_TOKEN_DURATION }
      );
      const veify_link = `${process.env.CLIENT_URL}/account/verify?token=${verify_token}`;

      await prisma.user.update({
        where: { id: user.id },
        data: {
          verify_token,
        },
      });

      // send confirmation mail to user
      sendMail({
        to: email,
        subject: 'Please verify your email account',
        html: `
                  <h3>Let's verify your single sender so you can start uploading songs.</h3>
                  <h4>${email}</h4>
                  <p>Your link is active for 24 hours. After that, you will need to resend the verification email.</p>
                  <a href="${veify_link}">Verify Email</a>
          `,
      });

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
    if (!user || !user.is_verified) {
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
  async verifyEmail(req: Request, res: Response) {
    const { token } = req.body;

    jwt.verify(
      token,
      process.env.VERIFY_ACCOUNT_SECRET || '',
      async (error: any, decoded: any) => {
        if (error) {
          return res.status(400).json({ msg: 'Token không hợp lệ', code: 1 });
        }

        const { id } = decoded;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          return res.status(400).json({ msg: 'User không tồn tại', code: 2 });
        }

        if (user.is_verified) {
          return res
            .status(400)
            .json({ msg: 'User đã được xác thực', code: 3 });
        }

        if (user.verify_token === token) {
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              is_verified: true,
              verify_token: null,
            },
          });

          return res.json({ msg: 'Xác thực email thành công' });
        } else {
          return res.status(400).json({ msg: 'Token không hợp lệ', code: 1 });
        }
      }
    );
  },
};

export default authController;
