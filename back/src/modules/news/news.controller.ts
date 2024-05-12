import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { NewsDto } from 'src/dtos/News.dto';
import { News } from 'src/entities/News.entity';
import { ImagesController } from '../storage/images.controller';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Noticias')
@Controller('news')
// export class NewsController {
//   constructor(private readonly newsService: NewsService) {}
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly imagesController: ImagesController,
  ) {}


  @Get()
  @ApiOperation({
    summary: 'Obtener todas las noticias',
    description: 'Esta ruta devuelve todas las noticias registradas',
  })
  getAllNews(): Promise<News[]> {
    console.log("ENTRASTE AL GET")
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
  @UseInterceptors(FileInterceptor('primaryImage')) 
  async createNews(  @Body() news: NewsDto, @Body() file: Express.Multer.File) {
    console.log("ENTRASTE AL POST")
    console.log(news.primaryImage)
    const uploadedImage = await this.imagesController.uploadImage(file);
    news.primaryImage = uploadedImage.url;
    console.log(news.primaryImage)
    return this.newsService.createNews(news);
    // try {
    //   let imageUrl = null;
    //   if (file) {
    //     const uploadedImage = await this.imagesController.uploadImage(file);
    //     imageUrl = uploadedImage.url;
    //   }
    //   news.primaryImage = imageUrl;
    //   return this.newsService.createNews(news);
    // } catch (error) {
    //   console.error('Error creating news:', error);
    //   throw error;
    // }
  }
  // createNews(@Body() news: NewsDto): Promise<News> {
  //   return this.newsService.createNews(news);
  // }


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
