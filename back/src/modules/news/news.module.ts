import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/News.entity';
import { ImagesModule } from '../../functions/storage/images.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([News]), ImagesModule], 
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
})
export class NewsModule {}
