import { Body, Controller, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}

  @Post('send')
  async sendMail(@Body() mailData: any): Promise<any> {
    await this.mailerService.sendMail(mailData);
    return { message: 'Email sent' };
  }
}
