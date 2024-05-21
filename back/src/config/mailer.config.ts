import sgMail from '@sendgrid/mail';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.env' });

sgMail.setApiKey(process.env.RESEND_API_KEY);

export default sgMail;
