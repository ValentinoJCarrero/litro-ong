import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsRepository {
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}

  getAllNews(): Promise<News[]> {
    return this.newsRepository.find();
  }

  getOneNews(title: string): Promise<News> {
    return this.newsRepository.findOne({ where: { title: title } });
  }

  createNews(news: NewsDto): Promise<News> {
    return this.newsRepository.save(news);
  }

  deleteNews(id: string) {
    return this.newsRepository.delete(id);
  }
}
