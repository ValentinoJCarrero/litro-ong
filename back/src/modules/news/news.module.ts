import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/News.entity';
import { ImagesService } from 'src/functions/storage/images.service';

@Module({
  imports: [TypeOrmModule.forFeature([News]), ], 
  controllers: [NewsController],
  providers: [NewsService, NewsRepository, ImagesService],
})
export class NewsModule {}
