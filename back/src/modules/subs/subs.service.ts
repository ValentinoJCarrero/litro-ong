import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { preappoval } from "src/config/mp.config";
import { PartnerService } from "../partner/partner.service";

@Injectable()
export class SubsService {
    constructor(private readonly partnerService: PartnerService) {}    
    
    async createSubscription(email: string) {
        const subscription = await preappoval.create({ body: {
            reason: 'Un Litro',
            payer_email: email,
            auto_recurring: {
                frequency: 1,
                frequency_type: 'months',
                transaction_amount: 1000,
                currency_id: 'ARS',
            },
            status: "pending",
            back_url: "https://litro-ong.vercel.app/"
        }})

        if(subscription.api_response.status === 201) {
            return {
                id: subscription.id,
                url: subscription.init_point
            }
        } else {
            throw new InternalServerErrorException('Error en la API de Mercado Pago.');
        }
    }

    async addSubscription(userId, subId: string) {
        await preappoval.get({ id: subId })
        .then(data => {
            if (data.status === 'authorized' || data.status === 'pending') return 'rejected';

            const subscription = {
                id: data.id,
                status: data.status,
                url: data.init_point,
                amount: data.auto_recurring.transaction_amount,
                next_payment_date: data.next_payment_date,
                payment_method: data.payment_method_id,
            }

            /* this.partnerService.createPartner(userId, subscription); */

            return subscription.status;
        })
        .catch(() => { throw new InternalServerErrorException('La API de Mercado Pago no responde.')})
    }
}