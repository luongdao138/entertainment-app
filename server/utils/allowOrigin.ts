import dotenv from 'dotenv';

dotenv.config();

const allowedOrigins: string[] = [process.env.CLIENT_URL || ''];

export default allowedOrigins;
