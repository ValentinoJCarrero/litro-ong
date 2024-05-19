import { Injectable } from '@nestjs/common';
import { resend } from 'src/config/mailer.config';
<<<<<<< HEAD
import { WelcomeMailDto } from 'src/dtos/Mail.dto';
=======
>>>>>>> 5daf07b82706886d7424855b6c5fa80019229451

@Injectable()
export class MailerService {
  constructor() {}

<<<<<<< HEAD
  async sendMail(mailData: any): Promise<any> {
    return await resend.emails.send({
      from: mailData.from,
      to: mailData.to,
      subject: mailData.subject,
      html: mailData.html,
=======
  async sendMail(email: string): Promise<any> {
    return await resend.emails.send({
      from: 'correo',
      to: email,
      subject: 'Registro en El Litro',
      html: 'html',
>>>>>>> 5daf07b82706886d7424855b6c5fa80019229451
    });
  }

  async sendWelcomeMail(mailData: WelcomeMailDto): Promise<any> {
    return await resend.emails.send({
      from: "onboarding@resend.dev",   
      to: mailData.email,
      subject: "Bienvenido a Litro Ong",
      html: `<h1>Bienvenido ${mailData.name} a Litro Ong</h1>
      <p>Gracias por registrarte en Litro Ong</p>
      <img src="../../Assets/logo.png"></img>`,
    });

  }
}