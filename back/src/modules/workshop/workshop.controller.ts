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
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WorkshopService } from './workshop.service';
import { Workshop } from 'src/entities/Workshop.entity';
import { WorkshopDto } from 'src/dtos/Workshop.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from '../storage/storage.service';
import { validate } from 'class-validator';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Talleres')
@Controller('workshop')
export class WorkshopController {
  constructor(
    private readonly workshopService: WorkshopService,
    private readonly storageService: StorageService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los talleres',
    description:
      'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de talleres y total es la cantidad de talleres registrados en la base de datos',
  })
  getAllWorkshop(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Workshop[]; total: number }> {
    return this.workshopService.getAllWorkshop(Number(limit), Number(page));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener un taller por id',
    description:
      'Esta ruta devuelve un taller especifico registrado por un id de tipo uuid, enviado por parámetro',
  })
  getWorkshop(@Param('id', ParseUUIDPipe) id: string): Promise<Workshop> {
    return this.workshopService.getWorkshop(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Actualizar un taller (solo para administradores)',
    description:
      'Esta ruta actualiza un taller registrado por un id de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  updateWorkshop(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() workshopData: Partial<WorkshopDto>,
  ) {
    return this.workshopService.updateWorkshop(id, workshopData);
  }

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo taller (solo para administradores)',
    description:
      'Esta ruta crea un nuevo taller con los datos enviados por body, de tipo WorkshopDto',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(FileInterceptor('files'))
  async createWorkshop(
    @Body() workshop: WorkshopDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Workshop> {
    const uploadedImage = await this.storageService.uploadImage(file);
    workshop.photo = uploadedImage;
    const errors = await validate(workshop);
    if (errors.length > 0) {
      throw new BadRequestException('La validación falló');
    }

    return this.workshopService.createWorkshop(workshop);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un taller (solo para administradores)',
    description:
      'Esta ruta elimina un taller registrado por un id, de tipo uuid enviado por parámetro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  deleteWorkshop(@Param('id', ParseUUIDPipe) id: string) {
    return this.workshopService.deleteWorkshop(id);
  }
}
