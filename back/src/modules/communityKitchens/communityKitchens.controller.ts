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
import { CommunityKitchensService } from './communityKitchens.service';
import { CommunityKitchens } from 'src/entities/CommunityKitchens.entity';
import { CommunityKitchensDto } from 'src/dtos/CommunityKitchens.dto';

@ApiTags('Merenderos')
@Controller('communityKitchens')
export class CommunityKitchensController {
  constructor(
    private readonly communityKitchensService: CommunityKitchensService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los merenderos',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de talleres y total es la cantidad de talleres registrados en la //base de datos',
  })
  getAllCommunityKitchens(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: CommunityKitchens[]; total: number }> {
    return this.communityKitchensService.getAllCommunityKitchens(
      Number(limit),
      Number(page),
    );
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un merendero por id',
    description:
      'Esta ruta devuelve un merendero especifico registrado por un id de tipo uuid, enviado por parámetro',
  })
  getCommunityKitchens(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CommunityKitchens> {
    return this.communityKitchensService.getCommunityKitchens(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un merendero (solo para administradores)',
    description:
      'Esta ruta actualiza un merendero registrado por un id de tipo uuid enviado por parámetro',
  })
  updateCommunityKitchens(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() communityKitchensData: Partial<CommunityKitchensDto>,
  ) {
    return this.communityKitchensService.updateCommunityKitchens(
      id,
      communityKitchensData,
    );
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo merendero (solo para administradores)',
    description:
      'Esta ruta crea un nuevo merendero con los datos enviados por body, de tipo CommunityKitchensDto',
  })
  async createCommunityKitchens(
    @Body() communityKitchens: CommunityKitchensDto,
  ): Promise<CommunityKitchens> {
    return this.communityKitchensService.createCommunityKitchens(
      communityKitchens,
    );
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un merendero (solo para administradores)',
    description:
      'Esta ruta elimina un merendero registrado por un id, de tipo uuid enviado por parámetro',
  })
  deleteCommunityKitchens(@Param('id', ParseUUIDPipe) id: string) {
    return this.communityKitchensService.deleteCommunityKitchens(id);
  }
}
