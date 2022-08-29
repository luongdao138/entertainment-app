import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

interface MailConfig {
  to: string;
  subject: string;
  text?: string;
  html: string;
}

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

const sendMail = async (config: MailConfig) => {
  try {
    await sgMail.send({ ...config, from: process.env.GOOGLE_MAIL as string });
  } catch (error: any) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body);
    }
  }
};

export default sendMail;
