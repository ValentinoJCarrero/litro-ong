import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { preapproval } from 'src/config/mp.config';
import { PartnerService } from '../partner/partner.service';

@Injectable()
export class SubsService {
  constructor(private readonly partnerService: PartnerService) {}

  async getAllSubscriptions(offset: number, limit: number) {
    try {
      const res = await preapproval.search({ options: {
        offset,
        limit
      }});

      const subscriptions = res.results;

      if(res.paging.total > offset + limit) {
        const nextSubscriptions = await this.getAllSubscriptions(offset+limit, limit);
        subscriptions.push(...nextSubscriptions);
      }

      return subscriptions;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getSubscriptionById(id: string) {
    await preapproval.get({ id }).then(data => console.log(data)).catch(error => console.log(error));
  }

  async createSubscription(email: string) {
    const subscription = await preapproval.create({
      body: {
        reason: 'Un Litro',
        payer_email: email,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: 1000,
          currency_id: 'ARS',
        },
        status: 'pending',
        back_url: 'https://litro-ong.vercel.app/',
      },
    });

    if (subscription.api_response.status === 201) {
      return {
        id: subscription.id,
        url: subscription.init_point,
      };
    } else {
      throw new InternalServerErrorException(
        'Error en la API de Mercado Pago.',
      );
    }
  }

  async uploadSubscription(subId: string, userId: string) {
    return await preapproval
      .get({ id: subId })
      .then(async (data) => {
      if (!(data.status === 'authorized')) return 'rejected';

        const nextPaymentDate = new Date(data.summarized.last_charged_date);
        nextPaymentDate.setUTCMonth(nextPaymentDate.getUTCMonth() + 1);

        const subscription = {
          transaction_id: data.id,
          status: data.status,
          url: data.init_point,
          amount: data.auto_recurring.transaction_amount,
          next_payment_date: nextPaymentDate.toISOString(),
          payment_method: data.payment_method_id,
        };

        await this.partnerService.createPartner(userId, subscription);

        return { status: subscription.status };
      })
      .catch(() => { throw new BadRequestException({ status: 'rejected' })});
  }
}
