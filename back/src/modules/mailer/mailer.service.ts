import { Injectable } from '@nestjs/common';
import { resend } from 'src/config/mailer.config';
import { CreateEmailResponse } from 'resend';

@Injectable()
export class MailerService {
  constructor() {}

  async sendMail(email: string): Promise<CreateEmailResponse> {
    return await resend.emails.send({
      from: 'correo',
      to: email,
      subject: 'Registro en El Litro',
      html: 'html',
    });
  }
}
