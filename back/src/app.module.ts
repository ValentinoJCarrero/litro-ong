import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './modules/news/news.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { BenefitModule } from './modules/benefit/benefit.module';
import dbConfig from './config/dbConfig';
import { EventModule } from './modules/event/event.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { VolunteerModule } from './modules/volunteer/volunteer.module';
import { MercadoPagoModule } from './modules/mercado-pago/mp.module';
import { StorageModule } from './modules/storage/storage.module';
import { MailerModule } from './modules/mailer/mailer.module';
import { DonationModule } from './modules/donation/donation.module';
import { WorkshopModule } from './modules/workshop/workshop.module';

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
      secret: process.env.JWT_SECRET,
    }),
    NewsModule,
    SponsorModule,
    BenefitModule,
    EventModule,
    UsersModule,
    AuthModule,
    MailerModule,
    MercadoPagoModule,
    StorageModule,
    VolunteerModule,
    DonationModule,
    WorkshopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
