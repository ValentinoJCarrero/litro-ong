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

  getAllNews(limit: number, page: number): Promise<News[]> {
    return this.newsRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getOneNews(id: string): Promise<News> {
    return this.newsRepository.findOne({ where: { id: id } });
  }

  createNews(news: NewsDto): Promise<News> {
    return this.newsRepository.save(news);
  }

  deleteNews(id: string) {
    return this.newsRepository.delete(id);
  }
}
