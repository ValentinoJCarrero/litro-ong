import { Body, Controller, Post } from '@nestjs/common';
import { Resend } from 'resend';

@Controller('mailer')
export class MailerController {
    private resend: Resend;

    constructor() {}

    @Post('send')
    async sendMail(@Body() mailData: any): Promise<any> {

        const resend = new Resend('re_7savDd1q_eNqCEgPzoTNJLgct7FvpxLL4');
        
            resend.emails.send({
            from: mailData.from,
            to: mailData.to,
            subject: mailData.subject,
            html: mailData.html
        });
    return ("Email sent")
    }
    
}
