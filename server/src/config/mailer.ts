import nodemailer from 'nodemailer';

export const mailer = nodemailer.createTransport({
  host: process.env.MAIL_TRANSPORT_HOST,
  port: Number(process.env.MAIL_TRANSPORT_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.MAIL_TRANSPORT_USER,
    pass: process.env.MAIL_TRANSPORT_PASS
  }
});
