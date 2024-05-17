import { Injectable } from "@nestjs/common";
import { preference, payment } from "src/config/mp.config";

@Injectable()
export class MercadoPagoService {
    constructor() {}

    async createPreference(price: number) {
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: '1',
                        title: 'Donación - El Litro',
                        quantity: 1,
                        unit_price: price
                    }
                ],
                back_urls: {
                    success: 'http://localhost:3000/mercadopago/success',
                    failure: 'http://localhost:3000/mercadopago/failure',
                    pending: 'http://localhost:3000/mercadopago/pending'
                },
                notification_url: 'https://e440-2800-810-434-8a87-cc67-737c-7c55-18e6.ngrok-free.app/mercadopago/webhook'
            },
        })

        return result.init_point;
    }

    async webhook(paid) {
        if(paid.type == 'payment') {
            const data = await payment.capture({ id: paid.data.id});
            console.log(data);
        }

        return 'webhook';
    }
}