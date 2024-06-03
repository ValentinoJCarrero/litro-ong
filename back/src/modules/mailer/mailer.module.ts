import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';
import { UsersModule } from '../users/users.module';
import {Proposals} from 'src/entities/Proposals.entity';
import { ExternalUsersModule } from '../externalUsers/externalUsers.module';
import { ExternalUsersRepository } from '../externalUsers/externalUsers.repository';
@Module({
  imports: [ ExternalUsersModule, UsersModule],
  controllers: [MailerController],
  providers: [ MailerService, Proposals ],
  exports: [ MailerService]
})
export class MailerModule {}
