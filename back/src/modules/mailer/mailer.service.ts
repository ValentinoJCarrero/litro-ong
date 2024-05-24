import { Injectable, OnModuleInit } from '@nestjs/common';
import { WelcomeMailDto } from 'src/dtos/Mail.dto';
import sgMail from '../../config/mailer.config';
import { UsersRepository } from '../users/users.repository';
import { Cron } from '@nestjs/schedule';



@Injectable()
export class MailerService implements OnModuleInit {
  constructor(private readonly usersRepository: UsersRepository) {}
  async onModuleInit() {
    //  return "Aca se ejecutaria el saludo por el cumpleaños."
  }
  
  unsuscribe() {
    throw new Error('Method not implemented.');
  }

  async sendWelcomeMail(mailData: WelcomeMailDto): Promise<any> {
    const msg = {
    to: mailData.email, 
    from: 'ellitroag@gmail.com', 
    subject: 'Registro completado - Un Litro',
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>¡Bienvenido a Litro!</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0}.container{width:80%;margin:0 auto;padding:20px;background-color:#f5f5f5}.header{text-align:center}.title{font-size:24px;font-weight:bold}.subtitle{font-size:18px}.body{margin-top:20px}.footer{text-align:center;margin-top:20px}.footer a{color:#007bff;text-decoration:none}</style></head><body><div class="container"><div class="header"><img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="200" height="200"><h1 class="title">¡Bienvenido a Litro!</h1><p class="subtitle">Gracias por registrarte en Litro.</p><p class="subtitle">Se ha registrado correctamente en <strong>El Litro</strong></p></div></div></body></html>`
    }

    sgMail.send(msg)
    .catch((error) => console.log(error))
    }
         
  async sendNewsletterMail(title, subtitle, description, primaryImage?): Promise<void> {
    try {
         const users = await this.usersRepository.getAllUsers(1, 100);//ademas del paginado, cuando crezca la ong va a ser necesario el envio por lotes.
         const mailList = users.data.map(user => user.email);
         
         console.log("SERVICE DATA",title, subtitle, description, primaryImage);         
         console.log(mailList);

         const msg = {
          to: mailList,
          from:  'nicolasaddamo1@gmail.com',
          subject: 'Noticias del litro',
          text: `este es el texto`,
          html:  `<div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
              <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">${title}</h1>
              <h2 style="font-size: 20px; font-weight: normal; margin-bottom: 20px;">${subtitle}</h2>
              <p style="font-size: 16px; margin-bottom: 20px;">${description}</p>
              ${primaryImage ? `<img src="${primaryImage}" alt="Newsletter Image" style="max-width: 100%; height: auto; margin-bottom: 20px;">` : ''}
              <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="50" height="50">
            </div>`,
            };
        await sgMail.send(msg);
          } catch (error) {
            console.error('Error sending newsletter email:', error);
          }
        }

        
  @Cron('1 9 1 1 *') 
  async cronNewyearMail(): Promise<void> {
    try {
        const users = await this.usersRepository.getAllUsers(1, 100);//ademas del paginado, cuando crezca la ong va a ser necesario el envio por lotes.
        const mailList = users.data.map(user => user.email);
        console.log(mailList);
        const msg = {
            to: mailList,
            from:  'ellitroag@gmail.com',
            subject: 'Feliz año Nuevo te deseamos desde el litro',
            text: `este es el texto`,
            html: `<strong>Feliz año Nuevo</strong>
                   <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="20" height="20">`,
        };
    await sgMail.send(msg);
  }
    catch (error) {
      console.error('Error sending newsletter email:', error);
    }
 }

 @Cron('1 9 25 12 *') //minuto, hora, dia, mes, dia de la semana (9:01 del 1ro de enero)
 async cronXMasMail(): Promise<void> {
    try {
        const users = await this.usersRepository.getAllUsers(1, 100);//ademas del paginado, cuando crezca la ong va a ser necesario el envio por lotes.
        const mailList = users.data.map(user => user.email);
        console.log(mailList);
        const msg = {
            to: mailList,
            from:  'ellitroag@gmail.com',
            subject: 'Feliz Navidad te deseamos desde el litro',
            text: `este es el texto`,
            html: `<strong>Feliz año Navidad</strong>
                   <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="20" height="20">`,
        };
        await sgMail.send(msg);
    }
    catch (error) {
      console.error('Error sending newsletter email:', error);
    }
 }
    
@Cron(' 45 45 8 * * *') 
async birthdayGreetings(): Promise<void> {
      const todayBirthdateUsers = await this.usersRepository.getBirthdayTodayUsers();

      for (const user of todayBirthdateUsers) {
      const msg = {
            to: user.email,
            from: 'nicolasaddamo1@gmail.com',
            subject:`Feliz cumpleaños${user.fullName} te deseamos desde el litro`,
            text: `este es el texto`,
            html:`<div style="font-family: Arial, sans-serif; text-align: center; color: #333;">
              <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">¡Feliz Cumpleaños, ${user.fullName}!</h1>
              <p style="font-size: 16px; margin-bottom: 20px;">Te deseamos un muy feliz cumpleaños.</p>
              <p>Saludos,</p>
              <p>El equipo de Litro de Leche</p>
              </div>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

    }

}
