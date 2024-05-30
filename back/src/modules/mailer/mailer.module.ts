import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { UsersModule } from '../users/users.module';
import { ScheduleModule } from '@nestjs/schedule';
import {Proposals} from 'src/entities/Proposals.entity';
@Module({
  imports: [ScheduleModule.forRoot(),UsersModule],
  controllers: [MailerController],
  providers: [ MailerService, Proposals],
  exports: [ MailerService]
})
export class MailerModule {}
