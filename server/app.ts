import express from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import corsConfig from './config/corsConfig';
import credentialMiddleware from './middlewares/credentials';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import songRouter from './routes/song';
import playlistRouter from './routes/playlist';
import verifyTokenMiddleware from './middlewares/verifyJwt';
import prisma from './config/prisma';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  morgan(
    ':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms'
  )
);

app.use(credentialMiddleware);
app.use(cors(corsConfig as CorsOptions));

app.get('/', async (req, res) => {
  // await prisma.user.delete({
  //   where: {
  //     email: 'luongtuduong296@gmail.com',
  //   },
  // });
  // const data = await prisma.user.update({
  //   where: { email: 'daovanluongpdl@gmail.com' },
  //   data: {
  //     is_verified: true,
  //   },
  // });

  // const data = await prisma.user.create({
  //   data: {
  //     email: 'zingmp3@gmail.com',
  //     full_name: 'Zing MP3',
  //     password: '$2a$10$WIFDCyPIjVsH4eeOPhMJKOxBZL2p7MnA.iBFeH0HQAaSf99f82UUe',
  //     is_premium: true,
  //     is_verified: true,
  //   },
  // });

  // const data = await prisma.user.findMany();
  // const data = await prisma.user.update({
  //   where: { email: 'zingmp3@gmail.com' },
  //   data: {
  //     password: '$2a$10$WIFDCyPIjVsH4eeOPhMJKOxBZL2p7MnA.iBFeH0HQAaSf99f82UUe',
  //   },
  // });

  // await prisma.playlist.update({
  //   where: {
  //     id: 'f3a92822-2bd3-43c8-abab-93777c02ecc4',
  //   },
  //   data: {
  //     liked_by: {
  //       connect: {
  //         id: '9ec85640-b04a-4fab-ad81-238fb084c908',
  //       },
  //     },
  //   },
  // });

  // await prisma.playlist.update({
  //   where: {
  //     id: 'cb171ee9-ba6f-48fd-9389-c247b89c154f',
  //   },
  //   data: {
  //     liked_by: {
  //       connect: {
  //         id: '9ec85640-b04a-4fab-ad81-238fb084c908',
  //       },
  //     },
  //   },
  // });
  // const data = await prisma.playlist.findMany({
  //   where: {
  //     liked_by: { some: { id: '9ec85640-b04a-4fab-ad81-238fb084c908' } },
  //   },
  // });

  // await prisma.playlist.update({
  //   where: {
  //     id: 'f3a92822-2bd3-43c8-abab-93777c02ecc4',
  //   },
  //   data: {
  //     liked_by: {
  //       create: {
  //         user: {
  //           connect: {
  //             id: '9ec85640-b04a-4fab-ad81-238fb084c908',
  //           },
  //         },
  //       },
  //     },
  //   },
  // });

  const data = await prisma.user.findMany({
    include: {
      favourite_playlists: {
        select: {
          playlist: {
            select: {
              id: true,
              title: true,
            },
          },
        },
      },
    },
  });

  return res.json({ data });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/song', songRouter);
app.use('/playlist', playlistRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
