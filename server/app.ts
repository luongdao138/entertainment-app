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
import historyRouter from './routes/history';
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
  //       name: 'Nh???c Phim Hoa Ng???',
  //     },
  //     {
  //       name: 'Nh???c Nh???t',
  //     },
  //   ],
  // });

  // await prisma.category.createMany({
  //   data: [
  //     {
  //       name: 'Nh???c tr??? Vi???t Nam',
  //     },
  //     {
  //       name: 'Nh???c c??? phong Trung Qu???c',
  //     },
  //     {
  //       name: 'Nh???c ????m c?????i',
  //     },
  //     {
  //       name: 'Nh???c H??n',
  //     },
  //     {
  //       name: 'Nh???c Vi???t',
  //     },
  //     {
  //       name: 'Nh???c ??u M???',
  //     },
  //     {
  //       name: 'Nh???c phim',
  //     },
  //     {
  //       name: 'Nh???c Thi???u Nhi',
  //     },
  //     {
  //       name: 'Nh???c Kh??ng L???i',
  //     },
  //     {
  //       name: 'Tr??? T??nh & Bolero',
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
  //       name: 'Nh???c Vi???t B???t H???',
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
  //       name: 'Nh???c Tr???nh',
  //     },
  //     {
  //       name: 'Indie',
  //     },
  //     {
  //       name: 'Nh???c ??u M??? B???t H???',
  //     },
  //     {
  //       name: 'Nh???c Tr???nh',
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
  // const songs = await prisma.song.findMany({
  //   where: {
  //     is_deleted: false,
  //   },
  //   select: { id: true, name: true, normalized_name: true },
  // });

  // for (const song of songs)
  //   await prisma.song.update({
  //     where: {
  //       id: song.id,
  //     },
  //     data: {
  //       normalized_name: removeAccents(song.name),
  //     },
  //   });

  // await prisma.song.updateMany({
  //   data: {
  //     privacy: 'public',
  //   },
  // });

  // await prisma.lyric.updateMany({
  //   data: {
  //     status: 1,
  //   },
  // });

  // const songs = await prisma.song.findMany();
  // await prisma.historySong.deleteMany({});

  // for (const song of songs) {
  //   await prisma.historySong.create({
  //     data: {
  //       song_id: song.id,
  //       user_id: '65126b06-7ce7-4cd5-b35e-af6a3452d5ef',
  //     },
  //   });
  // }

  return res.json({ msg: 'Success' });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/song', songRouter);
app.use('/playlist', playlistRouter);
app.use('/category', categoryRouter);
app.use('/history', historyRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
