import { Injectable } from '@nestjs/common';
import { WelcomeMailDto } from 'src/dtos/Mail.dto';
import sgMail from '../../config/mailer.config';

@Injectable()
export class MailerService {
  constructor() {}

  async sendMail(): Promise<any> {
    const msg = {
      to: "addamo.nicolas1991@gmail.com",
      from: 'nicolasaddamo1@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: `Gracias por registrarte en el Litro`,
      html: `<strong>El litro</strong>
      <p>Gracias por registrarte en el Litro</p>`,
    }
    sgMail.send(msg)
    .catch((error) => console.log(error))
  }

  async sendWelcomeMail(mailData: WelcomeMailDto): Promise<any> {
    const msg = {
    to: mailData.email, 
    from: 'nicolasaddamo1@gmail.com', 
    subject: 'Registro completado - Un Litro',
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>¡Bienvenido a Litro!</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0}.container{width:80%;margin:0 auto;padding:20px;background-color:#f5f5f5}.header{text-align:center}.title{font-size:24px;font-weight:bold}.subtitle{font-size:18px}.body{margin-top:20px}.footer{text-align:center;margin-top:20px}.footer a{color:#007bff;text-decoration:none}</style></head><body><div class="container"><div class="header"><img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="200" height="200"><h1 class="title">¡Bienvenido a Litro!</h1><p class="subtitle">Gracias por registrarte en Litro.</p><p class="subtitle">Se ha registrado correctamente en <strong>El Litro</strong></p></div></div></body></html>`
    }

    sgMail.send(msg)
    .catch((error) => console.log(error))
  }
}