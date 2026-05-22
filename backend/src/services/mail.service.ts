import nodemailer from "nodemailer";

type ContactFormData = {
  name: string;
  phone: string;
  email: string;
  comment: string;
};

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendContactEmails = async ({
  name,
  phone,
  email,
  comment,
}: ContactFormData) => {
  const ownerEmail = process.env.OWNER_EMAIL;

  if (!ownerEmail) {
    throw new Error("OWNER_EMAIL is not defined");
  }

  await transporter.sendMail({
    from: `"Developer Landing" <${process.env.SMTP_USER}`,
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
    from: `"Developer Landing" <${process.env.SMTP_USER}>`,
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
