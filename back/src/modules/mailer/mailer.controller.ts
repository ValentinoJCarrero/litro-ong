import { Body, Controller, Post, Put } from '@nestjs/common';
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


  @Put('unsuscribe')
  async unsuscribe(@Body() body) {
    return await this.mailerService.unsuscribe();
  }

}
