import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './modules/news/news.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { BenefitModule } from './modules/benefit/benefit.module';
import dbConfig from './config/dbConfig';
import { ImagesController } from './functions/storage/images.controller';
import { EventModule } from './modules/event/event.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { MailerController } from './functions/Mailer/mailer.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('dbConfig'),
    }),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET
    }),
    NewsModule, SponsorModule, BenefitModule,EventModule, UsersModule, AuthModule
  ],
  controllers: [AppController, ImagesController,MailerController],
  providers: [AppService],
})
export class AppModule {}
