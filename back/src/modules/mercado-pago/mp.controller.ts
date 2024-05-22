import { Body, Controller, Post, Req, Res } from '@nestjs/common';
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
  webhook(@Req() req, @Res() res) {
    const paid = req.body;
    return this.mpService.webhook(paid);  
  }
}
