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
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { Partner } from 'src/entities/Partner.entity';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';

@ApiTags('Socios')
@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos socios',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de socios y total es la cantidad de socios registrados en la base de datos',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  getAllPartners(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Partner[]; total: number }> {
    return this.partnerService.getAllPartners(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un socio por id',
    description:
      'Esta ruta devuelve un socio registrado por un id de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Partner')
  @UseInterceptors(RemoveDataSensitive)
  getOnePartner(@Param('id', ParseUUIDPipe) id: string): Promise<Partner> {
    return this.partnerService.getOnePartner(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un socio',
    description:
      'Esta ruta elimina un socio por un id de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Partner', 'Admin')
  deletePartner(@Param('id', ParseUUIDPipe) id: string) {
    return this.partnerService.deletePartner(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Registrar un socio',
    description:
      'Esta ruta registra un socio. Enviando un objeto de tipo Partner',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  createPartner(
    @Body() subscription,
    @Query('userId', ParseUUIDPipe) userId: string,
  ): Promise<{ partner: Partner; token: string }> {
    return this.partnerService.createPartner(userId, subscription);
  }
}
