import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { MercadoPagoService } from './mp.service';

@Controller('mercadopago')
export class MercadoPagoController {
  constructor(private readonly mpService: MercadoPagoService) {}
  
  @Get('success')
  success() {}

  @Get('pending')
  pending () {}

  @Get('failure')
  failure() {
    return 'fallaste chupapija'
  }

  @Post()
  createOrder(@Body() body) {
    return this.mpService.createPreference(body.price);
  }

  @Post('webhook')
  webhook(@Req() req, @Res() res) {
    const paid = req.body;
    return this.mpService.webhook(paid);  
  }
}
