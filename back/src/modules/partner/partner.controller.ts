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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PartnerService } from './partner.service';
import { Partner } from 'src/entities/Partner.entity';
import { PartnerDto } from 'src/dtos/Partner.dto';

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
  getOnePartner(@Param('id', ParseUUIDPipe) id: string): Promise<Partner> {
    return this.partnerService.getOnePartner(id);
  }

  @Post()
  async createPartner(@Body() partner: PartnerDto) {
    return this.partnerService.createPartner(partner);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un socio',
    description:
      'Esta ruta elimina un socio por un id de tipo uuid enviado por parámetro',
  })
  deletePartner(@Param('id', ParseUUIDPipe) id: string) {
    return this.partnerService.deletePartner(id);
  }
}
