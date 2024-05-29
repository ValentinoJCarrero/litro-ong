import { MercadoPagoConfig, Payment, PreApproval, Preference } from 'mercadopago';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.env' });

const client = new MercadoPagoConfig({ 
    accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN
});

const preference = new Preference(client);
const payment = new Payment(client);

export { preference, payment };

const subsClient = new MercadoPagoConfig({
    accessToken: process.env.SUBS_ACCESS_TOKEN
});

export const preapproval = new PreApproval(client);