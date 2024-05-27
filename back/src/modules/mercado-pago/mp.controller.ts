import { Body, Controller, Post } from '@nestjs/common';
import { MercadoPagoService } from './mp.service';
import { DonationDto } from 'src/dtos/Donation.dto';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}

  @Post()
  createOrder(@Body() donation: DonationDto) {
    return this.mpService.createPreference(donation);
  }

  @Post('webhook')
  webhook(@Body() paid) {
    return this.mpService.webhook(paid);  
  }
}
