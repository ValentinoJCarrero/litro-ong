import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from 'src/entities/User.entity';
import { UserDto } from 'src/dtos/User.dto';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { UpdateResult } from 'typeorm';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Usuarios')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({
    summary: ' Obtener todos los usuarios (Administradores)',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de usuarios y total es la cantidad de usuarios registrados en la base de datos',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Volunteer')
  @UseInterceptors(RemoveDataSensitive)
  getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: User[]; total: number }> {
    return this.usersService.getAllUsers(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({
    summary: ' Obtener un usuario por id',
    description:
      'Esta ruta devuelve un usuario registrado, por un id enviado por parametro',
  })
  @UseInterceptors(RemoveDataSensitive)
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.getUser(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un usuario por id',
    description:
      'Esta ruta actualiza un usuario, por un id enviado por parametro y datos nuevos, de tipo UserDto enviados por body',
  })
  updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<UserDto>,
  ): Promise<UpdateResult> {
    return this.usersService.updateUser(id, user);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un usuario por id',
    description:
      'Esta ruta elimina un usuario, por un id enviado por parametro',
  })
  deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    return this.usersService.deleteUser(id);
  }
}
