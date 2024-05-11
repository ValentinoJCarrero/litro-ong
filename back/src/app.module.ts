import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NewsModule } from './modules/news/news.module';
import { SponsorModule } from './modules/sponsor/sponsor.module';
import { BenefitModule } from './modules/benefit/benefit.module';
import dbConfig from './config/dbConfig';

@Module({
  imports: [
    /* ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
    useFactory: (configService: ConfigService) =>
        configService.get('dbConfig'),
    }), */
    NewsModule,
    SponsorModule,
    BenefitModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
