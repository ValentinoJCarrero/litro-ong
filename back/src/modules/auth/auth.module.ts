import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { UsersRepository } from '../users/users.repository';
import { AuthRepository } from './auth.repository';
import { MailerService } from '../mailer/mailer.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [AuthController],
    providers: [AuthService, AuthRepository, UsersRepository, MailerService]
})
export class AuthModule {}
