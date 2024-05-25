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
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProposalsService } from './proposals.service';
import { Proposals } from 'src/entities/Proposals.entity';
import { ProposalsDto } from 'src/dtos/Proposals.dto';

@ApiTags('Propuestas')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las propuestas',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de propuestas y total es la cantidad de propuestas registradas en la base de datos',
  })
  getAllProposals(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Proposals[]; total: number }> {
    return this.proposalsService.getAllProposals(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una propuesta por id',
    description:
      'Esta ruta devuelve una propuesta especifica registrada por un id de tipo uuid, enviado por parámetro',
  })
  getProposals(@Param('id', ParseUUIDPipe) id: string): Promise<Proposals> {
    return this.proposalsService.getProposals(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: '',
    description: '',
  })
  updateProposals(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() proposalsData: Partial<ProposalsDto>,
  ) {
    return this.proposalsService.updateProposals(id, proposalsData);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una propuesta',
    description:
      'Esta ruta crea una nueva propuesta con los datos enviados por body, de tipo ProposalsDto',
  })
  createProposals(@Body() proposals: ProposalsDto): Promise<Proposals> {
    return this.proposalsService.createProposals(proposals);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una propuesta (solo para administradores)',
    description:
      'Esta ruta elimina una propuesta registrada por un id, de tipo uuid enviado por parámetro',
  })
  deleteProposals(@Param('id', ParseUUIDPipe) id: string) {
    return this.proposalsService.deleteProposals(id);
  }
}
