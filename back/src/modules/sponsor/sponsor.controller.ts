import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from 'src/dtos/Sponsor.dto';
import { Sponsor } from 'src/entities/Sponsor';
import { ImagesController } from 'src/functions/storage/images.controller';
import { FileInterceptor } from '@nestjs/platform-express';
import { validate } from 'class-validator';

@ApiTags('Patrocinadores')
@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService
    , private readonly ImagesController: ImagesController
  ) {}

  @Get()
  getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorService.getAllSponsors();
  }

  @Get(':id')
  getOneSponsor(@Param('id', ParseUUIDPipe) id: string): Promise<Sponsor> {
    return this.sponsorService.getOneSponsor(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async reateSponsor(@Body() sponsor: SponsorDto, @UploadedFile() file: Express.Multer.File): Promise<Sponsor> {
    const uploadedImage= await this.ImagesController.uploadImage(file);
    
    sponsor.logo=uploadedImage.url
    const errors = await validate(sponsor);
    if (errors.length > 0) {
      throw new BadRequestException('La validación falló');
    }

    return this.sponsorService.createSponsor(sponsor);
  }

  @Delete(':id')
  deleteSponsor(@Param('id', ParseUUIDPipe) id: string) {
    return this.sponsorService.deleteSponsor(id);
  }
}
