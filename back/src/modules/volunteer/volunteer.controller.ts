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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { VolunteerService } from './volunteer.service';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { User } from 'src/entities/User.entity';
import { UpdateResult } from 'typeorm';
import { EventDto } from 'src/dtos/Event.dto';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Voluntarios')
@Controller('volunteer')
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Get('/all')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener todos los voluntarios',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de voluntarios y total es la cantidad de voluntarios registrados en la base de datos',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  getAllVolunteers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Volunteer[]; total: number }> {
    return this.volunteerService.getAllVolunteers(Number(limit), Number(page));
  }

  @Get('/one/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener un voluntario',
    description:
      'Esta ruta devuelve los datos de un voluntario especifico, junto a el usuario al que pertenecen. por un id enviado por parametro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Volunteer', 'Admin')
  @UseInterceptors(RemoveDataSensitive)
  getVolunteer(@Param('id', ParseUUIDPipe) id: string): Promise<Volunteer> {
    return this.volunteerService.getVolunteer(id);
  }

  @Post('/collaborate/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Agregarme como voluntario a un evento. (solo para voluntarios)',
    description:
      'Esta ruta agrega a un voluntario a un evento. por un id de voluntario enviado por parametro, y por el tipo de evento enviado por body',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Volunteer')
  @UseInterceptors(RemoveDataSensitive)
  collaboratEevent(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() event: Partial<EventDto>,
  ) {
    return this.volunteerService.collaboratEevent(id, event);
  }

  @Post('/assign/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Asignar nuevo voluntario',
    description:
      'Esta ruta le asigna a un usuario por su id enviado por parametro, los datos de voluntario enviados por body, y a su vez, le asigna el rol de voluntario al usuario y devuelve el usuario actualizado',
  })
  @UseGuards(AuthGuard)
  @UseInterceptors(RemoveDataSensitive)
  convertToVolunteer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() volunteerData: VolunteerDto,
  ): Promise<{ volunteer: Volunteer; token: string }> {
    return this.volunteerService.convertToVolunteer(id, volunteerData);
  }

  @Put('/update/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Actualizar un voluntario',
    description:
      'Esta ruta actualiza los datos de un voluntario por su id enviado por parametro y los datos enviados por body. devolvera los datos actualizados',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Volunteer')
  updateVolunteer(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() newData: Partial<VolunteerDto>,
  ): Promise<UpdateResult> {
    return this.volunteerService.updateVolunteer(id, newData);
  }

  @Delete('/removeVolunteer/:id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminar un voluntario',
    description:
      'Esta ruta elimina los datos de un voluntario por su id enviado por parametro y el rol de voluntario, sin afectar al usuario al que pertenece. devolvera el usuario actualizado',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Volunteer')
  @UseInterceptors(RemoveDataSensitive)
  deleteVolunteer(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.volunteerService.deleteVolunteer(id);
  }

  @Delete('/removeEvent/:idVolunteer')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Eliminarse como voluntario de un evento',
    description:
      'Esta ruta permite a un voluntario eliminarse a sí mismo de un evento. El id del voluntario es enviado por parametro, y el id del evento por Query',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Volunteer', 'Admin')
  @UseInterceptors(RemoveDataSensitive)
  removeVolunteersOfEvent(
    @Param('idVolunteer', ParseUUIDPipe) idVolunteer: string,
    @Query('idEvent', ParseUUIDPipe) idEvent: string,
  ): Promise<Volunteer> {
    return this.volunteerService.removeEvent(idVolunteer, idEvent);
  }
}
