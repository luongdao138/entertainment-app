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
  await prisma.user.delete({
    where: {
      email: 'jw2006lm@gmail.com',
    },
  });
  return res.json({ msg: 'Success' });
});

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/song', songRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
