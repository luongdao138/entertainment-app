import allowedOrigins from '../utils/allowOrigin';

const corsConfig = {
  origin: (origin: string, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Origin not allowed by CORS!'));
    }
  },
  credentials: true,
  // origin: ['http://127.0.0.1:5173'],
  optionsSuccessStatus: 200,
};

export default corsConfig;
