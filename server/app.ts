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
import categoryRouter from './routes/category';
import verifyTokenMiddleware from './middlewares/verifyJwt';
import prisma from './config/prisma';
import { removeAccents } from './utils/formatText';

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

  // await prisma.category.createMany({
  //   data: [
  //     {
  //       name: 'Nhạc Hoa',
  //     },
  //     {
  //       name: 'Nhạc Hàn',
  //     },
  //     {
  //       name: 'Nhạc Việt',
  //     },
  //     {
  //       name: 'Nhạc Âu Mỹ',
  //     },
  //     {
  //       name: 'Nhạc phim',
  //     },
  //     {
  //       name: 'Nhạc Thiếu Nhi',
  //     },
  //     {
  //       name: 'Nhạc Không Lời',
  //     },
  //     {
  //       name: 'Trữ Tình & Bolero',
  //     },
  //     {
  //       name: 'EDM',
  //     },
  //     {
  //       name: 'Remix',
  //     },
  //     {
  //       name: 'Hip-hop',
  //     },
  //     {
  //       name: 'R&B',
  //     },
  //     {
  //       name: 'Latin',
  //     },
  //     {
  //       name: 'Acoustic',
  //     },
  //     {
  //       name: 'Jazz',
  //     },
  //     {
  //       name: 'Nhạc Việt Bất Hủ',
  //     },
  //     {
  //       name: 'Piano',
  //     },
  //     {
  //       name: 'Guitar',
  //     },
  //     {
  //       name: 'Rock',
  //     },
  //     {
  //       name: 'Nhạc Trịnh',
  //     },
  //     {
  //       name: 'Indie',
  //     },
  //     {
  //       name: 'Nhạc Âu Mỹ Bất Hủ',
  //     },
  //     {
  //       name: 'Nhạc Trịnh',
  //     },
  //   ],
  // });

  // const data = await prisma.user.findMany({
  //   include: {
  //     favourite_songs: {
  //       select: {
  //         song: {
  //           select: {
  //             name: true,
  //             id: true,
  //           },
  //         },
  //         created_at: true,
  //       },
  //     },
  //   },
  // });

  // const data = await prisma.user.findMany({
  //   where: {
  //     full_name: {
  //       not: {},
  //     },
  //   },
  // });

  // const playlists = await prisma.playlist.findMany({
  //   where: { is_deleted: false },
  //   select: {
  //     title: true,
  //     normalized_title: true,
  //   },
  // });
  const songs = await prisma.song.findMany({
    where: {
      is_deleted: false,
    },
    select: { id: true, name: true, normalized_name: true },
  });

  // for (const song of songs)
  //   await prisma.song.update({
  //     where: {
  //       id: song.id,
  //     },
  //     data: {
  //       normalized_name: removeAccents(song.name),
  //     },
  //   });

  return res.json({ data: songs });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/song', songRouter);
app.use('/playlist', playlistRouter);
app.use('/category', categoryRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
