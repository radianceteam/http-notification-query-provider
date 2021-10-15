import {error, log} from "@http-notifs/logger";
import nodemailer, {SentMessageInfo, Transporter} from "nodemailer";

interface SendEmailConfirmationArg {
  token: string;
  email: string;
}
// async..await is not allowed in global scope, must use a wrapper
export default async function sendEmailConfirmation({
  email,
  token,
}: SendEmailConfirmationArg): Promise<void> {
  try {
    let transporter: Transporter<SentMessageInfo> | null = null;

    const env =
      process.env.NODE_ENV === "production" ? "production" : "development";

    if (env === "development") {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
      const testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    } else {
      transporter = nodemailer.createTransport({
        port: +(<string>process.env.MAIL_PORT),
        host: process.env.MAIL_HOST,
        auth: {
          user: process.env.MAIL_LOGIN,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    }

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: "noreply@http-notifs.xyz", // sender address
      to: email, // list of receivers
      subject: "Confirm Email", // Subject line
      text: `To confirm your email, please, copy the next link into your browser and open:\n\nhttps://http-notifs.xyz/confirm-email/${token}`, // plain text body
      html: `<p>To confirm your email, please, open the next link:</p>
<br>
<a href="https://http-notifs.xyz/confirm-email/${token}">https://http-notifs.xyz/confirm-email/${token}</a>`, // html body
    });

    log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    if (env === "development") {
      // Preview only available when sending through an Ethereal account
      log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
  } catch (err) {
    error(err);
  }
}
