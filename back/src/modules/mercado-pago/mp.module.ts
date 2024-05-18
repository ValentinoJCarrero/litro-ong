import { Module } from "@nestjs/common";
import { MercadoPagoController } from "./mp.controller";
import { MercadoPagoService } from "./mp.service";

@Module({
    controllers: [MercadoPagoController],
    providers: [MercadoPagoService]
})
export class MercadoPagoModule {}