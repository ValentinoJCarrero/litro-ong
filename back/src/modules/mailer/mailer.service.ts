import { Injectable } from '@nestjs/common';
import { resend } from 'src/config/mailer.config';

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
}
