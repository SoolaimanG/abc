import { createTransport } from "nodemailer";

type emailProps = {
  email: string;
  type: string;
  html: string;
};

//For nodemailer
const transporter = createTransport({
  host: "smtp-relay.brevo.com",
  port: 465,
  secure: false,
  service: "gmail",
  logger: true,
  debug: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://www.app.brevo.com>
    user: "suleimaangee@gmail.com",
    pass: process.env.SMTP_PASSWORD,
  },
  tls: {
    ciphers: "SSLv3",
    rejectUnauthorized: true,
  },
  requireTLS: true,
});

//Function for sending emails
export const sendEmail = async (props: emailProps) => {
  const { email, type, html } = props;
  // send mail with defined transport object
  await transporter
    .sendMail({
      from: "Admin",
      to: email, // list of receivers
      subject: type, // Subject line
      text: type, // plain text body
      html: html, // html body
    })
    .then(() => {
      console.log("Email");
    })
    .catch((err) => {
      console.log(err.message);
    });
};
