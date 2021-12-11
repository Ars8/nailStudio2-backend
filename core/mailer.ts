import nodemailer from 'nodemailer';

const options = {
  host: process.env.NODEMAILER_HOST || 'smtp.gmail.com',
  port: Number(process.env.NODEMAILER_PORT) || 465,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
};

export const mailer = nodemailer.createTransport(options);
