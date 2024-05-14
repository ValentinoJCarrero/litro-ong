import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from 'src/dtos/Sponsor.dto';
import { Sponsor } from 'src/entities/Sponsor';

@ApiTags('Patrocinadores')
@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los patrocinadores',
    description: 'Esta ruta devuelve todos los patrocinadores registrados',
  })
  getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorService.getAllSponsors();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un patrocinador por ID',
    description:
      'Esta ruta devuelve un patrocinador registrado por un id de tipo uuid enviado por parámetro',
  })
  getOneSponsor(@Param('id', ParseUUIDPipe) id: string): Promise<Sponsor> {
    return this.sponsorService.getOneSponsor(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo patrocinador (solo para administradores)',
    description:
      'Esta ruta crea un nuevo patrocinador con los datos enviados por body',
  })
  createSponsor(@Body() sponsor: SponsorDto): Promise<Sponsor> {
    return this.sponsorService.createSponsor(sponsor);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un patrocinador (solo para administradores)',
    description:
      'Esta ruta elimina un patrocinador por un id de tipo uuid enviado por parámetro',
  })
  deleteSponsor(@Param('id', ParseUUIDPipe) id: string) {
    return this.sponsorService.deleteSponsor(id);
  }
}
