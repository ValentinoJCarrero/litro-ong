import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SponsorService } from './sponsor.service';
import { SponsorDto } from 'src/dtos/Sponsor.dto';
import { Sponsor } from 'src/entities/Sponsor';

@ApiTags('Patrocinadores')
@Controller('sponsor')
export class SponsorController {
  constructor(private readonly sponsorService: SponsorService) {}

  @Get()
  getAllSponsors(): Promise<Sponsor[]> {
    return this.sponsorService.getAllSponsors();
  }

  @Get(':id')
  getOneSponsor(@Param('id', ParseUUIDPipe) id: string): Promise<Sponsor> {
    return this.sponsorService.getOneSponsor(id);
  }

  @Post()
  createSponsor(@Body() sponsor: SponsorDto): Promise<Sponsor> {
    return this.sponsorService.createSponsor(sponsor);
  }

  @Delete(':id')
  deleteSponsor(@Param('id', ParseUUIDPipe) id: string) {
    return this.sponsorService.deleteSponsor(id);
  }
}
