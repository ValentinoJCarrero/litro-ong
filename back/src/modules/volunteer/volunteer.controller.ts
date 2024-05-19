import {
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
  UseInterceptors,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { User } from 'src/entities/User.entity';
import { UpdateResult } from 'typeorm';
import { EventDto } from 'src/dtos/Event.dto';

@ApiTags('Voluntarios')
@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los voluntarios',
    description:
      'Esta ruta devuelve todos los datos de los voluntarios junto a el usuario al que pertenecen',
  })
  @UseInterceptors(RemoveDataSensitive)
  getAllVolunteers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<Volunteer[]> {
    return this.volunteerService.getAllVolunteers(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un voluntario',
    description:
      'Esta ruta devuelve los datos de un voluntario especifico, junto a el usuario al que pertenecen. por un id enviado por parametro',
  })
  @UseInterceptors(RemoveDataSensitive)
  getVolunteer(@Param('id', ParseUUIDPipe) id: string): Promise<Volunteer> {
    return this.volunteerService.getVolunteer(id);
  }
  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un voluntario',
    description:
      'Esta ruta actualiza los datos de un voluntario por su id enviado por parametro y los datos enviados por body. devolvera los datos actualizados',
  })
  @UseInterceptors(RemoveDataSensitive)
  updateVolunteer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: Partial<VolunteerDto>,
  ): Promise<UpdateResult> {
    return this.volunteerService.updateVolunteer(id, newData);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un voluntario',
    description:
      'Esta ruta elimina los datos de un voluntario por su id enviado por parametro y el rol de voluntario, sin afectar al usuario al que pertenece. devolvera el usuario actualizado',
  })
  @UseInterceptors(RemoveDataSensitive)
  deleteVolunteer(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.volunteerService.deleteVolunteer(id);
  }
  @Post('/collaborate/:id')
  @ApiOperation({
    summary: 'Agregarme como voluntario a un evento. (solo para voluntarios)',
    description:
      'Esta ruta agrega a un voluntario a un evento. por un id de voluntario enviado por parametro, y por el tipo de evento enviado por body',
  })
  collaboratEevent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() event: Partial<EventDto>,
  ) {
    return this.volunteerService.collaboratEevent(id, event);
  }
  @Post(':id')
  @ApiOperation({
    summary: 'Asignar nuevo voluntario',
    description:
      'Esta ruta le asigna a un usuario por su id enviado por parametro, los datos de voluntario enviados por body, y a su vez, le asigna el rol de voluntario al usuario y devuelve el usuario actualizado',
  })
  @UseInterceptors(RemoveDataSensitive)
  convertToVolunteer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() volunteerData: VolunteerDto,
  ): Promise<User> {
    return this.volunteerService.convertToVolunteer(id, volunteerData);
  }
}
