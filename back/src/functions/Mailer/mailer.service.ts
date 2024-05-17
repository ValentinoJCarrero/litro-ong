import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailerService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend('re_7savDd1q_eNqCEgPzoTNJLgct7FvpxLL4');
  }

  async sendMail(mailData: any): Promise<any> {
    return await this.resend.emails.send({
      from: mailData.from,
      to: mailData.to,
      subject: mailData.subject,
      html: mailData.html,
    });
  }
}
