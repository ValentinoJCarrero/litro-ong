import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';

@ApiTags('Noticias')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las noticias',
    description: 'Esta ruta devuelve todas las noticias registradas',
  })
  getAllNews(): Promise<News[]> {
    return this.newsService.getAllNews();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una noticia por ID',
    description:
      'Esta ruta devuelve una noticia registrada por un id de tipo uuid enviado por parámetro',
  })
  getOneNews(@Param('id', ParseUUIDPipe) id: string): Promise<News> {
    return this.newsService.getOneNews(id);
  }

  @Post('')
  @ApiOperation({
    summary: 'Crear una nueva noticia (solo para administradores)',
    description:
      'Esta ruta crea una nueva noticia con los datos enviados por body',
  })
  createNews(@Body() news: NewsDto): Promise<News> {
    return this.newsService.createNews(news);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una noticia (solo para administradores)',
    description:
      'Esta ruta elimina una noticia por un id de tipo uuid enviado por parámetro',
  })
  deleteNews(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsService.deleteNews(id);
  }
}
