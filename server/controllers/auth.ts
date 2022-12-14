import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import prisma from '../config/prisma';
import _ from 'lodash';
import {
  ACCESS_TOKEN_DURATION,
  FORGOT_PASSWORD_TOKEN_DURATION,
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
      const verify_link = `${process.env.CLIENT_URL}/account/verify?token=${verify_token}&email=${user.email}`;

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
                  <h3>Let's verify your account so you can start uploading songs.</h3>
                  <h4>${email}</h4>
                  <p>Your link is active for 24 hours. After that, you will need to resend the verification email.</p>
                  <a href="${verify_link}">Verify Email</a>
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
          return res.status(400).json({ msg: 'Token kh??ng h???p l???', code: 1 });
        }

        const { id } = decoded;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          return res.status(400).json({ msg: 'User kh??ng t???n t???i', code: 2 });
        }

        if (user.is_verified) {
          return res
            .status(400)
            .json({ msg: 'User ???? ???????c x??c th???c', code: 3 });
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

          return res.json({ msg: 'X??c th???c email th??nh c??ng' });
        } else {
          return res.status(400).json({ msg: 'Token kh??ng h???p l???', code: 1 });
        }
      }
    );
  },
  async resendEmail(req: Request, res: Response) {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ msg: 'User kh??ng t???n t???i' });
    }

    if (user.is_verified) {
      return res.status(400).json({ msg: 'User ???? ???????c x??c th???c' });
    }

    const verify_token = jwt.sign(
      { id: user.id },
      process.env.VERIFY_ACCOUNT_SECRET || '',
      { expiresIn: VERIFY_ACCOUNT_TOKEN_DURATION }
    );
    const veify_link = `${process.env.CLIENT_URL}/account/verify?token=${verify_token}&email=${user.email}`;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verify_token,
      },
    });

    // send confirmation mail to user
    sendMail({
      to: user.email,
      subject: 'Please verify your email account',
      html: `
                  <h3>Let's verify your account so you can start uploading songs.</h3>
                  <h4>${user.email}</h4>
                  <p>Your link is active for 24 hours. After that, you will need to resend the verification email.</p>
                  <a href="${veify_link}">Verify Email</a>
          `,
    });

    return res.status(200).json({
      msg: 'G???i email x??c th???c th??nh c??ng',
    });
  },
  async verifyForgotPassword(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ msg: 'Email kh??ng ???????c ????? tr???ng' });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ msg: 'Email ch??a ???????c ????ng k?? b???i t??i kho???n n??o' });
    }

    const forgot_password_token = jwt.sign(
      { id: user.id },
      process.env.FORGOT_PASSWORD_SECRET || '',
      { expiresIn: FORGOT_PASSWORD_TOKEN_DURATION }
    );
    const verify_link = `${process.env.CLIENT_URL}/account/forgotPassword?token=${forgot_password_token}`;

    await prisma.user.update({
      where: { id: user.id },
      data: {
        forgot_password_token,
      },
    });

    // send confirmation mail to user
    sendMail({
      to: email,
      subject: 'Forgot password',
      html: `
                  <h3>Click the link below to retrieve your password</h3>
                  <h4>${email}</h4>
                  <p>Your link is active for 24 hours. After that, you will need to resend the verification email.</p>
                  <a href="${verify_link}">Retrieve password</a>
          `,
    });

    return res.json({ msg: 'X??c nh???n email th??nh c??ng' });
  },
  async changePassword(req: Request, res: Response) {
    const { token, new_password } = req.body;

    jwt.verify(
      token,
      process.env.FORGOT_PASSWORD_SECRET || '',
      async (error: any, decoded: any) => {
        if (error) {
          return res.status(400).json({ msg: 'Token kh??ng h???p l???', code: 1 });
        }

        const { id } = decoded;
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) {
          return res.status(400).json({ msg: 'User kh??ng t???n t???i', code: 2 });
        }

        if (!user.is_verified) {
          return res
            .status(400)
            .json({ msg: 'User ch??a ???????c x??c th???c', code: 3 });
        }

        if (user.forgot_password_token === token) {
          const hash_pw = await bcrypt.hash(new_password, 10);
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              forgot_password_token: null,
              password: hash_pw,
            },
          });

          return res.json({ msg: '?????i m???t kh???u th??nh c??ng' });
        } else {
          return res.status(400).json({ msg: 'Token kh??ng h???p l???', code: 1 });
        }
      }
    );
  },
};

export default authController;
