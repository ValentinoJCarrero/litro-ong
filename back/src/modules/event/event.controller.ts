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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { EventDto } from 'src/dtos/Event.dto';
import { Event } from 'src/entities/Event.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';
import { validate } from 'class-validator';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';

@ApiTags('Eventos')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los eventos',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de eventos y total es la cantidad de eventos registrados en la base de datos',
  })
  @UseInterceptors(RemoveDataSensitive)
  getAllEvent(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Event[]; total: number }> {
    return this.eventService.getAllEvent(Number(limit), Number(page));
  }

  @Get('/future')
  @ApiOperation({
    summary: 'Obtener todos los eventos futuros',
    description:
      'Esta ruta devuelve todos los eventos registrados, posteriores a la fecha actual',
  })
  @UseInterceptors(RemoveDataSensitive)
  getFutureEvents(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Event[]; total: number }> {
    return this.eventService.getFutureEvents(Number(limit), Number(page));
  }

  @Get('/past')
  @ApiOperation({
    summary: 'Obtener todos los eventos pasados',
    description:
      'Esta ruta devuelve todos los eventos registrados, anteriores a la fecha actual',
  })
  @UseInterceptors(RemoveDataSensitive)
  getPastEvents(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Event[]; total: number }> {
    return this.eventService.getPastEvents(Number(limit), Number(page));
  }

  @Get(':title')
  @ApiOperation({
    summary: 'Obtener un evento por titulo',
    description:
      'Esta ruta devuelve un evento registrado por un titulo especifico, enviado por parámetro',
  })
  @UseInterceptors(RemoveDataSensitive)
  getOneEvent(@Param('title') title: string): Promise<Event> {
    return this.eventService.getOneEvent(title);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un evento (solo para administradores)',
    description:
      'Esta ruta actualiza un evento registrado por un id de tipo uuid enviado por parámetro',
  })
  @UseInterceptors(RemoveDataSensitive)
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
  @UseInterceptors(FilesInterceptor('files', 2))
  async createEvent(
    @Body() event: EventDto,
    @UploadedFiles() files: Express.Multer.File[],
  ): Promise<Event> {
    if (!files) {
      throw new BadRequestException('No se recibieron archivos');
    }

    const uploadedImages = await Promise.all(
      files.map((file) => this.storageService.uploadImage(file)), // Usa ImagesService para subir imágenes
    );

    // Extrae las URLs de las imágenes subidas
    [event.primaryImage, event.secondaryImage] = uploadedImages.map(
      (image) => image,
    );

    // Validación manual del DTO
    const errors = await validate(event);
    if (errors.length > 0) {
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

  @Post(':id')
  @ApiOperation({
    summary: 'Agregar un voluntario a un evento (solo para administradores)',
    description:
      'Esta ruta, agrega a un usuario de tipo voluntario, a un evento especifico. El id del voluntario es enviado por parámetro y el evento por body',
  })
  @UseInterceptors(RemoveDataSensitive)
  addVolunteer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() event: Partial<Event>,
  ) {
    return this.eventService.addVolunteer(id, event);
  }
}
