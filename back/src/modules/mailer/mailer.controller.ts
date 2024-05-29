import { Body, Controller, Post, Put,Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) {}
  
  @ApiOperation({ 
    summary: 'Enviar Newsletter desde dashboard',
    description:'Esta ruta envia la informacion del newsletter para ser enviada por email campos utilizados title, subtitle, description e imagen opcional.'  
  })
  @Post('newsletter')
  async sendNewsletterMailController(@Body() newsLetterForm: any) {
    if(!newsLetterForm.title || !newsLetterForm.subtitle || !newsLetterForm.description) return 'Titulo, Subtitulo y Descripción son requeridos.';
    
    if(newsLetterForm.title.length < 5 || newsLetterForm.title.length>20  ) return 'Titulo, debe tener entre 5 y 20 caracteres.'
    
    if(newsLetterForm.subtitle.length < 5 || newsLetterForm.subtitle.length>20  ) return 'Titulo, debe tener entre 5 y 20 caracteres.'
    
    if(newsLetterForm.description.length < 100 || newsLetterForm.title.length>400  ) return 'Titulo, debe tener entre 100 y 500 caracteres.'
    
    return await this.mailerService.sendNewsletterMail(newsLetterForm.title, newsLetterForm.subtitle, newsLetterForm.description, newsLetterForm.primaryImage);
    
  }


  @Put('unsubscribe')
  async unsuscribe(@Body('email') email:string) {
    if(!email) return "Email es obligatorio para desuscribirse";
    await this.mailerService.unsubscribe(email)
    return "La desuscripción fue exitosa";
  }

  @Get('send-christmas-email')
  async sendChristmasEmail() {
      await this.mailerService.cronXMasMail();
      return { message: 'Christmas email sent' };
  }

  @Get('send-newyear-email')
  async sendNewYearEmail() {
      await this.mailerService.cronNewyearMail();
      return { message: 'New Year email sent' };
  }

  @Get('send-birthday-email')
  async sendBirthdayEmail() {
      await this.mailerService.birthdayGreetings();
      return { message: 'Birthday email sent' };
  }
}

