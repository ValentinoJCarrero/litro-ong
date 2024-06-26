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
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';
import { StorageService } from '../storage/storage.service';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

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
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de noticias y total es la cantidad de noticias registradas en la base de datos',
  })
  getAllNews(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: News[]; total: number }> {
    return this.newsService.getAllNews(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una noticia por id',
    description:
      'Esta ruta devuelve una noticia registrada por un id de tipo uuid enviado por parámetro',
  })
  getOneNews(@Param('id', ParseUUIDPipe) id: string): Promise<News> {
    return this.newsService.getOneNews(id);
  }

  @Post()
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Crear una nueva noticia (solo para administradores)',
    description:
      'Esta ruta crea una nueva noticia con los datos enviados por body',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
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
      uploadedImages.map((image) => image);

    // Validación manual del DTO
    const errors = await validate(news);
    if (errors.length > 0) {
      throw new BadRequestException('La validación falló');
    }

    return this.newsService.createNews(news);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar una noticia (solo para administradores)',
    description:
      'Esta ruta elimina una noticia por un id de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  deleteNews(@Param('id', ParseUUIDPipe) id: string) {
    return this.newsService.deleteNews(id);
  }
}
