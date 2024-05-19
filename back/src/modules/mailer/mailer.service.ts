import { Injectable } from '@nestjs/common';
import { WelcomeMailDto } from 'src/dtos/Mail.dto';
import sgMail from '@sendgrid/mail';
import { config as dotenvconfig } from 'dotenv';

dotenvconfig({ path: '.env' });

sgMail.setApiKey(process.env.RESEND_API_KEY);


@Injectable()
export class MailerService {
  constructor() {}

  async sendMail(): Promise<any> {
    const msg = {
      to: "addamo.nicolas1991@gmail.com", // Change to your recipient
      from: 'nicolasaddamo1@gmail.com', // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
      text: `Gracias por registrarte en el Litro`,
      html: `<strong>El litro</strong>
      <p>Gracias por registrarte en el Litro</p>`,
      }
  
      sgMail.send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
  }

  async sendWelcomeMail(mailData: WelcomeMailDto): Promise<any> {
    const msg = {
    to: mailData.email, // Change to your recipient
    from: 'nicolasaddamo1@gmail.com', // Change to your verified sender
    subject: 'Un litro de leche',
    text: `Gracias por registrarte en el Litro ${mailData.name}`,
    html: `<strong>El litro</strong>
    <p>Gracias por registrarte en el Litro ${mailData.name}</p>
    <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" border="0" width="400" height="400">`,
    }

    sgMail.send(msg)
    .then(() => {
      console.log('Email sent')
    })
    .catch((error) => {
      console.error(error)
    })
    

  }
}