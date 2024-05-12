import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';

@ApiTags('Noticias')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  getAllNews(): Promise<News[]> {
    return this.newsService.getAllNews();
  }

  @Get(':id')
  getOneNews(@Param('id', ParseUUIDPipe) id: string): Promise<News> {
    return this.newsService.getOneNews(id);
  }

  @Post()
  createNews(@Body() news: NewsDto): Promise<News> {
    return this.newsService.createNews(news);
  }

  @Delete(':id')
  deleteNews(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsService.deleteNews(id);
  }
}
