import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';
 
@Injectable()
export default class EmailService {
  private nodemailerTransport: Mail;
 
  constructor(
    private readonly configService: ConfigService
  ) {
    this.nodemailerTransport = createTransport({
      host: 'smtp.sendgrid.net',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
      }
    });
  }
 
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}