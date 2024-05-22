import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NewsRepository } from './news.repository';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';

@Injectable()
export class NewsService {
  constructor(private readonly newsRepository: NewsRepository) {}

  async getAllNews(
    limit: number,
    page: number,
  ): Promise<{ data: News[]; total: number }> {
    const allNews = await this.newsRepository.getAllNews(limit, page);
    if (allNews.data.length === 0) {
      throw new NotFoundException('No se encontraron noticias en esta pagina');
    } else {
      return allNews;
    }
  }

  async getOneNews(id: string): Promise<News> {
    const newsById: News | null = await this.newsRepository.getOneNews(id);
    if (!newsById) {
      throw new NotFoundException('Noticia no encontrada');
    }
    return newsById;
  }

  async createNews(news: NewsDto): Promise<News> {
    try {
      return await this.newsRepository.createNews(news);
    } catch (error) {
      if ((error as any).message?.includes('unicidad')) {
        throw new ConflictException('Ya existe una noticia con ese título');
      }
      throw error;
    }
  }

  deleteNews(id: string) {
    return this.newsRepository.deleteNews(id);
  }
}
