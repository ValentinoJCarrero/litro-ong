import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsRepository } from './news.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from 'src/entities/News.entity';
import { ImagesController } from '../../functions/storage/images.controller';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository,ImagesController],
})
export class NewsModule {

}
