import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Donation } from 'src/entities/Donation.entity';
import { DonationDto } from 'src/dtos/Donation.dto';

@ApiTags('Donaciones')
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  @ApiOperation({
    summary: ' Obtener todas las donaciones',
    description: 'Esta ruta devuelve todas las donaciones registradas',
  })
  @UseInterceptors(RemoveDataSensitive)
  getAllDonations(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<Donation[]> {
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

  @Post()
  @ApiOperation({
    summary: 'Registrar una donacion',
    description:
      'Esta ruta registra una donacion. si la donacion fue hecha por un usuario registrado, se debe enviar su id por parametro y se actualiza su informacion. Si la donacion fue hecha por un usuario no registrado, se registra la donacion sin la informacion del usuario',
  })
  @UseInterceptors(RemoveDataSensitive)
  async registerDonation(@Body() donation: DonationDto): Promise<Donation> {
    return this.donationService.registerDonation(donation);
  }
}
