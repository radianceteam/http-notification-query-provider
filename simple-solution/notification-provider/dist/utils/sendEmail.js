"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const sendEmail = async (email, link) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 465,
        secure: true,
        auth: {
            user: 'Api_ntf',
            pass: process.env.SENDGRID_API_KEY,
        },
    });
    const info = await transporter.sendMail({
        from: '"Fred Foo 👻" <sergeygitte@gmail.com>',
        to: email,
        subject: 'Hello ✔',
        text: 'Hello world?',
        html: `<b>Hello world?</b> <a href="${link}">confirm Email</a>`,
    });
    console.log('Message sent: %s', info.messageId);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=sendEmail.js.map