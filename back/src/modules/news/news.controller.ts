import {
  Body,
  Controller,
  Delete,
  Get,
  Query,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
  DefaultValuePipe,
  BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { StorageService } from '../storage/storage.service';

@ApiTags('Noticias')
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las noticias',
    description: 'Esta ruta devuelve todas las noticias registradas',
  })
  getAllNews(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<News[]> {
    return this.newsService.getAllNews(limit, page);
  }

  @Get(':title')
  @ApiOperation({
    summary: 'Obtener una noticia por titulo',
    description:
      'Esta ruta devuelve una noticia registrada por un id de tipo uuid enviado por parámetro',
  })
  getOneNews(@Param('title') title: string): Promise<News> {
    return this.newsService.getOneNews(title);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva noticia (solo para administradores)',
    description:
      'Esta ruta crea una nueva noticia con los datos enviados por body',
  })
  @UseInterceptors(FilesInterceptor('files', 3))
  async createNews(
    @Body() news: NewsDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files.length < 1) {
      throw new BadRequestException('Debe cargarse al menos una imagen');
    }

    const uploadedImages = await Promise.all(
      files.map((file) => this.storageService.uploadImage(file)), // Usa ImagesService para subir imágenes
    );

    // Extrae las URLs de las imágenes subidas
    [news.primaryImage, news.secondaryImage, news.tertiaryImage] =
      uploadedImages.map((image) => image.url);

    // Validación manual del DTO
    const errors = await validate(news);
    if (errors.length > 0) {
      throw new BadRequestException('La validación falló');
    }

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
