import { Injectable, OnModuleInit } from '@nestjs/common';
import { WelcomeMailDto } from 'src/dtos/Mail.dto';
import sgMail from '../../config/mailer.config';
import { UserDto } from 'src/dtos/User.dto';
import { UsersRepository } from '../users/users.repository';
import { Cron } from '@nestjs/schedule';



@Injectable()
export class MailerService implements OnModuleInit {
  constructor(private readonly usersRepository: UsersRepository) {}
  async onModuleInit() {
  //  return "Aca se ejecutaria el saludo por el cumpleaños."
  }
  
  async sendMail(): Promise<any> {
    const msg = {
      to: "addamo.nicolas1991@gmail.com",
      from: 'nicolasaddamo1@gmail.com',
      subject: 'Sending with SendGrid is Fun',
      text: `Gracias por registrarte en el Litro`,
      html: `<strong>El litro</strong>
      <p>Gracias por registrarte en el Litro</p>`,
    }
    sgMail.send(msg)
    .catch((error) => console.log(error))
  }

  async sendWelcomeMail(mailData: WelcomeMailDto): Promise<any> {
    const msg = {
    to: mailData.email, 
    from: 'nicolasaddamo1@gmail.com', 
    subject: 'Registro completado - Un Litro',
    html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>¡Bienvenido a Litro!</title><style>body{font-family:Arial,sans-serif;margin:0;padding:0}.container{width:80%;margin:0 auto;padding:20px;background-color:#f5f5f5}.header{text-align:center}.title{font-size:24px;font-weight:bold}.subtitle{font-size:18px}.body{margin-top:20px}.footer{text-align:center;margin-top:20px}.footer a{color:#007bff;text-decoration:none}</style></head><body><div class="container"><div class="header"><img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="200" height="200"><h1 class="title">¡Bienvenido a Litro!</h1><p class="subtitle">Gracias por registrarte en Litro.</p><p class="subtitle">Se ha registrado correctamente en <strong>El Litro</strong></p></div></div></body></html>`
    }

    sgMail.send(msg)
    .catch((error) => console.log(error))
  }
  calculateAge = function(birthDate: Date): number {
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      if (new Date(today.getFullYear(), today.getMonth(), today.getDate()) < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())) {
        age--;
      }
    return age;
  }
        async sendBirthdayMessage(user: UserDto): Promise<void> {
          const age = this.calculateAge(new Date(user.birthDate));
          const messageSubject = `¡Feliz cumpleaños, ${user.fullName}!`;
          const messageBody = `
          <!DOCTYPE html>
          <html lang="es">
          <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>¡Feliz cumpleaños!</title>
          </head>
          <body>
          <p>Hola, ${user.fullName},</p>
          <p>¡Feliz cumpleaños! Desde el litro te deseamos un día lleno de alegría y felicidad. ¡Cumpliste ${age} años!</p>
          <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="200" height="200">
          </body>
          </html>
          `;
          
          const message = {
            from: 'your-email@example.com',
            to: user.email,
            subject: messageSubject,
            html: messageBody,
          };
          const today = new Date();
          if (new Date(today.getFullYear(), today.getMonth(), today.getDate()) === new Date(today.getFullYear(), new Date (user.birthDate).getMonth(),  new Date (user.birthDate).getDate())) {
            try {
              await sgMail.send(message);
              console.log(`Birthday greeting sent to ${user.email}`);
            } catch (error) {
              console.error(`Error sending birthday greeting to ${user.email}:`, error);
            }
          }
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


      @Cron('1 9 1 1 *') //minuto, hora, dia, mes, dia de la semana (9:01 del 1ro de enero)
      async cronNewyearMail(): Promise<void> {
        try {
          const users = await this.usersRepository.getAllUsers(1, 100);//ademas del paginado, cuando crezca la ong va a ser necesario el envio por lotes.
          const mailList = users.data.map(user => user.email);
          console.log(mailList);
          const msg = {
            to: mailList,
            from:  'nicolasaddamo1@gmail.com',
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
            from:  'nicolasaddamo1@gmail.com',
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

}
