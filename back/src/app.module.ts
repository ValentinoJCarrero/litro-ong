import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
``;
