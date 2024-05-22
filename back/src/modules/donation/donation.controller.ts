import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Donation } from 'src/entities/Donation.entity';

@ApiTags('Donaciones')
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  @ApiOperation({
    summary: ' Obtener todas las donaciones',
    description:
      'Esta ruta devuelve un objeto con data y total. donde data es un arreglo de donaciones y total es la cantidad de donaciones registradas en la base de datos',
  })
  @UseInterceptors(RemoveDataSensitive)
  getAllDonations(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Donation[]; total: number }> {
    return this.donationService.getAllDonations(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener una donacion por id',
    description:
      'Esta ruta devuelve una donacion registrada, por un id enviado por parametro',
  })
  @UseInterceptors(RemoveDataSensitive)
  async getDonation(@Param('id', ParseUUIDPipe) id: string): Promise<Donation> {
    return this.donationService.getDonation(id);
  }
}
