import { Injectable } from '@nestjs/common';
import { WelcomeMailDto } from 'src/dtos/Mail.dto';
import sgMail from '../../config/mailer.config';
import { UsersRepository } from '../users/users.repository';
import { Proposals } from 'src/entities/Proposals.entity';
import { ExternalUsersRepository } from '../externalUsers/externalUsers.repository';

@Injectable()
export class MailerService {
  constructor(private readonly usersRepository: UsersRepository,
              private readonly externalUsersRepository: ExternalUsersRepository
    ) {}

  
  async unsubscribe(email: string): Promise<void> {
    const user = await this.usersRepository.getUserByEmail(email);
    const euser = await this.externalUsersRepository.getExternalUsers(email);

    if (!user && !euser) {
      console.log(`No user found with email: ${email}`);
      return;
    }

    try {
      if (user) {
        await this.usersRepository.updateUser(user.id, { isSubscribed: false });
        console.log(`User unsubscribed: ${user.email}`);
      } else {
        await this.externalUsersRepository.deleteExternalUser(email);
        console.log(`External user unsubscribed: ${email}`);
      }
    } catch (error) {
      console.error('Error unsubscribing user:', error);
    }

    const users = await this.usersRepository.getAllUsers(1, 100);
    const mailList = users.data.filter(user => user.isSubscribed).map(user => user.email);
    console.log(mailList);
  }

  async sendWelcomeMail(mailData: WelcomeMailDto): Promise<any> {
    const msg = {
    to: mailData.email, 
    from: 'ellitroaltagracia@gmail.com', 
    subject: 'Registro completado - Un Litro',
    html: `<!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>¡Bienvenido a Litro!</title>
      <style>
      body{font-family:Arial,sans-serif;margin:0;padding:0}
      .container{width:80%;margin:0 auto;padding:20px;background-color:#f5f5f5}
      .header{text-align:center}
      .title{font-size:24px;font-weight:bold}
      .subtitle{font-size:18px}.body{margin-top:20px}
      .footer{text-align:center;margin-top:20px}
      .footer 
      a{color:#007bff;text-decoration:none}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
        <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="50" height="50">
        <h1 class="title">¡Bienvenido a Litro!</h1>
        <p class="subtitle">Gracias por registrarte en Litro.</p>
        <p class="subtitle">Se ha registrado correctamente en <strong>El Litro</strong></p>
        </div>
      </div>
    </body>
    </html>`
    }

    sgMail.send(msg)
    .catch((error) => console.log(error))
    }
         
  async sendNewsletterMail(title, subtitle, description, primaryImage?): Promise<void> {
    try {
         const users = await this.usersRepository.getAllUsers(1, 100);//ademas del paginado, cuando crezca la ong va a ser necesario el envio por lotes.)
         const mailList = users.data.filter(user => user.isSubscribed===true && user.email);
         const emaillist = await this.externalUsersRepository.getAllExternalUsers();
         const uri="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png"
         console.log(mailList);
        const msg = {
          to: mailList, emaillist,
          from:  'ellitroaltagracia@gmail.com',
          subject: 'Noticias del litro',
          text: `este es el texto`,
          html:  `
            <!DOCTYPE html>
              <html lang="es">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>¡Bienvenido a Litro!</title>
                <style>
                body{font-family:Arial,sans-serif;margin:0;padding:0}
                .container{width:80%;margin:0 auto;padding:20px;background-color:#f5f5f5}
                .header{text-align:center}
                .title{font-size:24px;font-weight:bold}
                .subtitle{font-size:18px}.body{margin-top:20px}
                .footer{text-align:center;margin-top:20px}
                .footer 
                a{color:#007bff;text-decoration:none}
                </style>
              </head>
            <body>
              <div class="container">
                <div class="header">
                  <img src="${uri}" alt="Litro de leche" width="50" height="50">
                  <h1 class="title">${title}</h1>
                  <h2 class="subtitle">${subtitle}</h2>
                  <p style="font-size: 16px; margin-bottom: 20px;">${description}</p>
                  ${primaryImage ? `<img src="${primaryImage}" width="100" height="100;">`: ''}
                  <p>No quieres recibir mas mails? Hace click <a href="https://litro-ong.vercel.app/unsubscribe">aqui</a></p>
                </div>
              </div>
            </body>
          </html>                
          `,};
        await sgMail.send(msg);
          } catch (error) {
            console.error('Error sending newsletter email:', error);
          }
        }

  async cronNewyearMail(): Promise<void> {
    try {
        const users = await this.usersRepository.getAllUsers(1, 100);
        const mailList = users.data.map(user => user.email);
        const msg = {
            to: mailList,
            from:  'ellitroaltagracia@gmail.com',
            subject: 'Feliz año Nuevo!',
            text: `este es el texto`,
            html: `<p>¡Feliz Año Nuevo! En este primer día del año, queremos expresar nuestra más profunda gratitud por su continuo apoyo y solidaridad. Gracias a ustedes, hemos logrado avanzar en nuestra misión y tocar la vida de muchas personas.

            Les deseamos un año lleno de esperanza, prosperidad y alegría. Que este nuevo año les traiga muchas bendiciones y que juntos podamos seguir trabajando por un mundo mejor.
            
            ¡Por un próspero y feliz 2024!
            
            Con nuestros mejores deseos,  <strong>Un Litro</strong><p>
            <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="20" height="20">`,
        };
    await sgMail.send(msg);
  }
    catch (error) {
      console.error('Error sending newsletter email:', error);
    }
 }

 async cronXMasMail(): Promise<void> {
    try {
        const users = await this.usersRepository.getAllUsers(1, 100);//ademas del paginado, cuando crezca la ong va a ser necesario el envio por lotes.
        const mailList = users.data.map(user => user.email);
        const msg = {
            to: mailList,
            from:  'nicolasaddamo1@gmail.com',
            subject: 'Feliz Navidad!',
            text: `este es el texto`,
            html: `<p>En esta temporada de amor y alegría, queremos agradecerles por su apoyo y compromiso a lo largo del año. Su generosidad nos ha permitido seguir adelante con nuestra misión y hacer una diferencia significativa en la vida de muchas personas.

            Les deseamos una Navidad llena de paz, felicidad y momentos inolvidables junto a sus seres queridos. Que el espíritu de la Navidad ilumine sus hogares y corazones.
            
            ¡Feliz Navidad y un próspero Año Nuevo!
            
            Con gratitud, <strong>Un Litro</strong><p>
            <img src="https://res.cloudinary.com/dsiic5ax7/image/upload/v1716153635/logo_s6phc5.png" alt="Litro de leche" width="20" height="20">`,
        };
        await sgMail.send(msg);
    }
    catch (error) {
      console.error('Error sending newsletter email:', error);
    }
 }
    
async birthdayGreetings(): Promise<void> {
      const todayBirthdateUsers = await this.usersRepository.getBirthdayTodayUsers();

      for (const user of todayBirthdateUsers) {
      const msg = {
            to: user.email,
            from: 'ellitroaltagracia@gmail.com',
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

    async sendProposalMail(proposals: Proposals): Promise<any> {
      const mensaje=proposals.status === 'APPROVED'? "Probablemente uno de nuestros representantes se comunicara contigo. Muchas gracias por la contribucion.": "Tu contribucion ha sido rechazada. Apreciamos igualmente tu esfuerzo."
    
        const msg = {
        to: proposals.user.email, 
        from: 'ellitroaltagracia@gmail.com', 
        subject: 'Registro completado - Un Litro',
        html: `<!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>¡Bienvenido a Litro!</title>
          <style>
          body{font-family:Arial,sans-serif;margin:0;padding:0}
          .container{width:80%;margin:0 auto;padding:20px;background-color:#f5f5f5}
          .header{text-align:center}
          .title{font-size:24px;font-weight:bold}
          .subtitle{font-size:18px}.body{margin-top:20px}
          .footer{text-align:center;margin-top:20px}
          .footer 
          a{color:#007bff;text-decoration:none}
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
            <h1 class="title">Cambio en el estado de tu propuesta</h1>
            <p class="subtitle">${proposals.user.fullName} te queremos contar que tu propuesta ${proposals.title} ha sido <strong> ${proposals.status==="APPROVED"? "Aceptada" : "Rechazada"}. </strong></p>
            <p class="subtitle">${mensaje}<strong> El Litro</strong></p>
            </div>
          </div>
        </body>
        </html>`
        }
    

  }
}