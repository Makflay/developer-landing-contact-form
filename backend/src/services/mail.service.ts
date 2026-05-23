import nodemailer from "nodemailer";
import { env } from "../config/env.config";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT),
  secure: Number(env.SMTP_PORT) === 465,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export const sendContactEmails = async ({
  name,
  phone,
  email,
  comment,
}: ContactFormData) => {
  const ownerEmail = env.CONTACT_RECEIVER_EMAIL;

  if (!ownerEmail) {
    throw new Error("CONTACT_RECEIVER_EMAIL is not defined");
  }

  await transporter.sendMail({
    from: `"Developer Landing" <${env.SMTP_USER}>`,
    to: ownerEmail,
    replyTo: email,
    subject: `New contact form message from ${name}`,
    text: `
      Имя: ${name}
      Телефон: ${phone}
      Почта: ${email}
      Сообщение:
      ${comment}      
    `,
  });

  await transporter.sendMail({
    from: `"Developer Landing" <${env.SMTP_USER}>`,
    to: email,
    subject: "Your message has been received",
    text: `
      Доброго времени суток ${name}!

      Спасибо за ваше письмо. Я получил ваше письмо и в скором времени дам свой ответ.

      Ваше сообщение:
      ${comment}
    `,
  });
};
