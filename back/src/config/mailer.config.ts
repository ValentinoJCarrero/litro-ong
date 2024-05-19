import { Resend } from 'resend';
import { config as dotenvconfig } from 'dotenv';
dotenvconfig({ path: '.env' });

export const resend = new Resend(process.env.RESEND_API_KEY);
