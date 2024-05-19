import { Injectable } from '@nestjs/common';
import { resend } from 'src/config/mailer.config';
import { WelcomeMailDto } from 'src/dtos/Mail.dto';

@Injectable()
export class MailerService {
  constructor() {}


  async sendMail(email: string): Promise<any> {
    return await resend.emails.send({
      from: 'correo',
      to: email,
      subject: 'Registro en El Litro',
      html: 'html',
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