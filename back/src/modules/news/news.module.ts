import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/News.entity';
import { StorageService } from '../storage/storage.service';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [TypeOrmModule.forFeature([News]), MailerModule],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, StorageService],
})
export class NewsModule {}
