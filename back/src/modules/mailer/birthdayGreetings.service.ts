import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from './mailer.service';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class BirthdayCronService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly mailerService: MailerService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async handleBirthdayEmails() {
    const usersWithBirthdayToday = await this.usersRepository.getUsersWithBirthdayToday();
    
    for (const user of usersWithBirthdayToday) {
      const { fullName, email } = user;
      const subject = '¡Feliz Cumpleaños!';
      const text = `Hola ${fullName},\n\n¡Te deseamos un muy feliz cumpleaños!\n\nSaludos,\nEl equipo de Litro de Leche`;
      const html = `
        <div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
          <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">¡Feliz Cumpleaños, ${fullName}!</h1>
          <p style="font-size: 16px; margin-bottom: 20px;">Te deseamos un muy feliz cumpleaños.</p>
          <p>Saludos,</p>
          <p>El equipo de Litro de Leche</p>
        </div>
      `;
      
      await this.mailerService.sendMail({ to: email, subject, text, html });
    }
  }
}
