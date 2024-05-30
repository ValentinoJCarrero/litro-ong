import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DonationService } from './donation.service';
import { RemoveDataSensitive } from 'src/interceptors/RemoveDataRes.interceptor';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Donation } from 'src/entities/Donation.entity';
import { AuthGuard } from 'src/guards/Auth.guard';
import { RolesGuard } from 'src/guards/Roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Donaciones')
@Controller('donation')
export class DonationController {
  constructor(private readonly donationService: DonationService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({
    summary: ' Obtener todas las donaciones',
    description:
      'Esta ruta devuelve un objeto con data y total. donde data es un arreglo de donaciones y total es la cantidad de donaciones registradas en la base de datos',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  getAllDonations(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ): Promise<{ data: Donation[]; total: number }> {
    return this.donationService.getAllDonations(Number(page), Number(limit));
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Obtener una donacion por id',
    description:
      'Esta ruta devuelve una donacion registrada, por un id enviado por parametro',
  })
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('Admin')
  @UseInterceptors(RemoveDataSensitive)
  async getDonation(@Param('id', ParseUUIDPipe) id: string): Promise<Donation> {
    return this.donationService.getDonation(id);
  }
}
