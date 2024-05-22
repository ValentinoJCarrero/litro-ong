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
import { BenefitService } from './benefit.service';
import { Benefit } from 'src/entities/Benefit.entity';
import { BenefitDto } from 'src/dtos/Benefit.dto';

@ApiTags('Beneficios')
@Controller('benefit')
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los beneficios',
    description:
      'Esta ruta devuelve un objeto con data y total. donde data es un arreglo de beneficios y total es la cantidad de beneficios registrados en la base de datos',
  })
  getAllBenefits(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Benefit[]; total: number }> {
    return this.benefitService.getAllBenefits(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un beneficio por ID',
    description:
      'Esta ruta devuelve un beneficio registrado por un id de tipo uuid enviado por parámetro',
  })
  getOneBenefit(@Param('id', ParseUUIDPipe) id: string) {
    return this.benefitService.getOneBenefit(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo beneficio (solo para administradores)',
    description:
      'Esta ruta crea un nuevo beneficio con los datos enviados por body',
  })
  createBenefit(@Body() benefit: BenefitDto) {
    return this.benefitService.createBenefit(benefit);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un beneficio (solo para administradores)',
    description:
      'Esta ruta elimina un beneficio por un id de tipo uuid enviado por parámetro',
  })
  deleteBenefit(@Param('id', ParseUUIDPipe) id: string) {
    return this.benefitService.deleteBenefit(id);
  }
}
