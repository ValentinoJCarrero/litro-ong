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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProposalsService } from './proposals.service';
import { Proposals } from 'src/entities/Proposals.entity';
import { ProposalsDto } from 'src/dtos/Proposals.dto';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Propuestas')
@Controller('proposals')
export class ProposalsController {
  constructor(private readonly proposalsService: ProposalsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las propuestas',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de propuestas y total es la cantidad de propuestas registradas en la base de datos. Se puede enviar por query page y limit para la paginación, por defecto page es 1 y limit es 5. y se puede enviar por query un filter para filtrar por el estado de la propuesta en caso de ser necesario(APPROVED, REJECTED o PENDING)',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  getAllProposals(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
    @Query('filter') filter?: string,
  ): Promise<{ data: Proposals[]; total: number }> {
    return this.proposalsService.getAllProposals(
      Number(limit),
      Number(page),
      filter,
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una propuesta por id',
    description:
      'Esta ruta devuelve una propuesta especifica registrada por un id de tipo uuid, enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  getProposals(@Param('id', ParseUUIDPipe) id: string): Promise<Proposals> {
    return this.proposalsService.getProposals(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar el estado de una propuesta',
    description:
      'Esta ruta actualiza el estado de una propuesta por un id de tipo uuid enviado por parámetro y el nuevo estado por Query',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  updateProposals(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('status') newStatus: string,
  ) {
    return this.proposalsService.updateProposals(id, newStatus);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear una propuesta',
    description:
      'Esta ruta crea una nueva propuesta con los datos enviados por body, de tipo ProposalsDto',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Volunteer', 'Partner')
  @UseInterceptors(RemoveDataSensitive)
  createProposals(
    @Query('userId', ParseUUIDPipe) id: string,
    @Body() proposals: ProposalsDto,
  ): Promise<Proposals> {
    return this.proposalsService.createProposals(id, proposals);
  }

  @Delete('/one/:id')
  @ApiOperation({
    summary: 'Eliminar una propuesta (solo para administradores)',
    description:
      'Esta ruta elimina una propuesta registrada por un id, de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin', 'Volunteer')
  deleteProposals(@Param('id', ParseUUIDPipe) id: string) {
    return this.proposalsService.deleteProposals(id);
  }

  @Delete('/all')
  @ApiOperation({
    summary: 'Eliminar todas las propuestas (solo para administradores)',
    description:
      'Esta ruta elimina todas las propuestas registradas anteriores a un mes con status diferente a PENDING ',
  })
  deleteAllProposals() {
    return this.proposalsService.deleteAllProposals();
  }
}
