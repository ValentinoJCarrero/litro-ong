import {
  BadRequestException,
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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StorageService } from '../storage/storage.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BenefitService } from './benefit.service';
import { Benefit } from 'src/entities/Benefit.entity';
import { BenefitDto } from 'src/dtos/Benefit.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';

@ApiTags('Beneficios')
@Controller('benefit')
export class BenefitController {
  constructor(
    private readonly benefitService: BenefitService,
    private readonly storageService: StorageService,
  ) {}

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
  @UseInterceptors(FileInterceptor('files'))
  async createBenefit(
    @Body() benefit: BenefitDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const uploadedImage = await this.storageService.uploadImage(file);
    benefit.logo = uploadedImage;
    const errors = await validate(benefit);
    if (errors.length > 0) {
      throw new BadRequestException('La validación falló');
    }
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
