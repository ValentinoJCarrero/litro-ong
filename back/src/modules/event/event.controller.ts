import {
  BadRequestException,
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { EventDto } from 'src/dtos/Event.dto';
import { Event } from 'src/entities/Event.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImagesService } from 'src/functions/storage/images.service';

@ApiTags('Eventos')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService,
              private readonly ImagesController: ImagesService
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los eventos',
    description: 'Esta ruta devuelve todos los eventos registrados',
  })
  getAllEvent(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<Event[]> {
    return this.eventService.getAllEvent(Number(limit), Number(page));
  }

  @Get('/future')
  @ApiOperation({
    summary: 'Obtener todos los eventos futuros',
    description:
      'Esta ruta devuelve todos los eventos registrados, posteriores a la fecha actual',
  })
  getFutureEvents(): Promise<Event[]> {
    return this.eventService.getFutureEvents();
  }

  @Get('/past')
  @ApiOperation({
    summary: 'Obtener todos los eventos pasados',
    description:
      'Esta ruta devuelve todos los eventos registrados, anteriores a la fecha actual',
  })
  getPastEvents(): Promise<Event[]> {
    return this.eventService.getPastEvents();
  }

  @Get(':title')
  @ApiOperation({
    summary: 'Obtener un evento por titulo',
    description:
      'Esta ruta devuelve un evento registrado por un titulo especifico, enviado por parámetro',
  })
  getOneEvent(@Param('title') title: string): Promise<Event> {
    return this.eventService.getOneEvent(title);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un evento (solo para administradores)',
    description:
      'Esta ruta actualiza un evento registrado por un id de tipo uuid enviado por parámetro',
  })
  updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() eventData: Partial<EventDto>,
  ) {
    return this.eventService.updateEvent(id, eventData);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo evento (solo para administradores)',
    description:
      'Esta ruta crea un nuevo evento con los datos enviados por body, de tipo EventDto',
  })
  @UseInterceptors(FileInterceptor('image'))
  async createEvent(@Body() event: EventDto, @UploadedFile() image: Express.Multer.File): Promise<Event> {
    
    const uploadedImage = await this.ImagesController.uploadImage(image);
    event.image = uploadedImage.url
    console.log(event.image)
    if (!event.image) {
        throw new BadRequestException('La validación falló');
    }
    return this.eventService.createEvent(event); 
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un evento (solo para administradores)',
    description:
      'Esta ruta elimina un evento por un id, de tipo uuid enviado por parámetro',
  })
  deleteEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventService.deleteEvent(id);
  }
}
