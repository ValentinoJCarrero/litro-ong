import { Injectable } from "@nestjs/common";
import { preference, payment } from "src/config/mp.config";
import { DonationDto } from "src/dtos/Donation.dto";
import { DonationService } from "../donation/donation.service";
import { Donation } from "src/entities/Donation.entity";

@Injectable()
export class MercadoPagoService {
    constructor(
        private readonly donationService: DonationService
    ) {}

    async createPreference(donation: DonationDto) {
        const result = await preference.create({
            body: {
                items: [
                    {
                        id: '1',
                        title: 'Donación - El Litro',
                        quantity: 1,
                        unit_price: donation.amount
                    }
                ],
                notification_url: 'https://litro-ong.onrender.com/mercadopago/webhook',
                payer: {
                    name: donation.fullName,
                    surname: donation.email
                }
            },
        })
        return result.init_point;
    }

    async webhook(paid): Promise<Donation> {
        if(paid.type == 'payment') {
            const data = await payment.capture({ id: paid.data.id});

            const user = data.additional_info.payer;

            const donation = {
                fullName: user.first_name,
                email: user.last_name,
                amount: data.transaction_amount
            }

            return await this.donationService.registerDonation(donation);
        }
    }
}