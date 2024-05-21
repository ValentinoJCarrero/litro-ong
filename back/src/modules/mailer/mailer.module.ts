import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [ UsersModule],
  controllers: [MailerController],
  providers: [ MailerService],
  exports: [ MailerService]
})
export class MailerModule {}
