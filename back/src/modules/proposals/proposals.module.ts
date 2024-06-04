import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proposals } from 'src/entities/Proposals.entity';
import { ProposalsService } from './proposals.service';
import { ProposalsController } from './proposals.controller';
import { ProposalsRepository } from './proposals.repository';
import { User } from 'src/entities/User.entity';
import { MailerService } from '../mailer/mailer.service';
import { UsersRepository } from '../users/users.repository';
import { ExternalUsersModule } from '../externalUsers/externalUsers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Proposals, User]), ExternalUsersModule],
  controllers: [ProposalsController],
  providers: [ProposalsService, ProposalsRepository, MailerService, UsersRepository],
})
export class ProposalsModule {}
