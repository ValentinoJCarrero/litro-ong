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
  UseGuards,
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
import { Roles } from 'src/decorators/roles.decorator';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';

@ApiTags('Eventos')
@Controller('event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly storageService: StorageService,
  ) {}

  @Get('/all')
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

  @Get('/one/:id')
  @ApiOperation({
    summary: 'Obtener un evento por titulo',
    description:
      'Esta ruta devuelve un evento registrado por un titulo especifico, enviado por parámetro',
  })
  @UseInterceptors(RemoveDataSensitive)
  getOneEvent(@Param('id', ParseUUIDPipe) id: string): Promise<Event> {
    return this.eventService.getOneEvent(id);
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

  @Post('/addVolunteer/:id')
  @ApiOperation({
    summary: 'Agregar un voluntario a un evento (solo para administradores)',
    description:
      'Esta ruta, agrega a un usuario de tipo voluntario, a un evento especifico. El id del voluntario es enviado por parámetro y el evento por body',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  addVolunteer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() event: Partial<Event>,
  ) {
    return this.eventService.addVolunteer(id, event);
  }

  @Post('/create')
  @ApiOperation({
    summary: 'Crear un nuevo evento (solo para administradores)',
    description:
      'Esta ruta crea un nuevo evento con los datos enviados por body, de tipo EventDto',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
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

  @Put('/update/:id')
  @ApiOperation({
    summary: 'Actualizar un evento (solo para administradores)',
    description:
      'Esta ruta actualiza un evento registrado por un id de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  updateEvent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() eventData: Partial<EventDto>,
  ) {
    return this.eventService.updateEvent(id, eventData);
  }

  @Delete('/delete/:id')
  @ApiOperation({
    summary: 'Eliminar un evento (solo para administradores)',
    description:
      'Esta ruta elimina un evento por un id, de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  deleteEvent(@Param('id', ParseUUIDPipe) id: string) {
    return this.eventService.deleteEvent(id);
  }

  @Delete('/removeVolunteer/:idEvent')
  @ApiOperation({
    summary: 'Eliminar un voluntario de un evento(solo para administradores)',
    description:
      'Esta ruta elimina un voluntario asignado a un evento.El id del evento es enviado por parametro y el id del voluntario por query',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  removeVolunteersOfEvent(
    @Param('idEvent', ParseUUIDPipe) idEvent: string,
    @Query('idVolunteer', ParseUUIDPipe) idVolunteer: string,
  ) {
    return this.eventService.removeVolunteer(idEvent, idVolunteer);
  }
}
