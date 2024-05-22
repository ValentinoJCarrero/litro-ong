import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommunityKitchensService } from './communityKitchens.service';

@ApiTags('Merenderos')
@Controller('communityKitchens')
export class CommunityKitchensController {
  constructor(
    private readonly communityKitchensService: CommunityKitchensService,
  ) {}

  //@Get()
  //@ApiOperation({
  //  summary: 'Obtener todos los talleres',
  //  description:
  //    'Esta ruta devuelve un objeto con data y total. Donde data es un arreglo de talleres y total es la cantidad de talleres registrados en la //base de datos',
  //})
  //getAllWorkshop(
  //  @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  //  @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  //): Promise<{ data: Workshop[]; total: number }> {
  //  return this.workshopService.getAllWorkshop(Number(limit), Number(page));
  //}
  //
  //@Get(':id')
  //@ApiOperation({
  //  summary: 'Obtener un taller por id',
  //  description:
  //    'Esta ruta devuelve un taller especifico registrado por un id de tipo uuid, enviado por parámetro',
  //})
  //getWorkshop(@Param('id', ParseUUIDPipe) id: string): Promise<Workshop> {
  //  return this.workshopService.getWorkshop(id);
  //}
  //
  //@Put(':id')
  //@ApiOperation({
  //  summary: 'Actualizar un taller (solo para administradores)',
  //  description:
  //    'Esta ruta actualiza un taller registrado por un id de tipo uuid enviado por parámetro',
  //})
  //updateWorkshop(
  //  @Param('id', ParseUUIDPipe) id: string,
  //  @Body() workshopData: Partial<WorkshopDto>,
  //) {
  //  return this.workshopService.updateWorkshop(id, workshopData);
  //}
  //
  //@Post()
  //@ApiOperation({
  //  summary: 'Crear un nuevo taller (solo para administradores)',
  //  description:
  //    'Esta ruta crea un nuevo taller con los datos enviados por body, de tipo WorkshopDto',
  //})
  //async createWorkshop(@Body() workshop: WorkshopDto): Promise<Workshop> {
  //  return this.workshopService.createWorkshop(workshop);
  //}
  //
  //@Delete(':id')
  //@ApiOperation({
  //  summary: 'Eliminar un taller (solo para administradores)',
  //  description:
  //    'Esta ruta elimina un taller registrado por un id, de tipo uuid enviado por parámetro',
  //})
  //deleteWorkshop(@Param('id', ParseUUIDPipe) id: string) {
  //  return this.workshopService.deleteWorkshop(id);
  //}
}
