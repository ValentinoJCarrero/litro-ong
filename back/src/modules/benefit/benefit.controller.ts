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
import { BenefitService } from './benefit.service';
import { Benefit } from 'src/entities/Benefit.entity';
import { BenefitDto } from 'src/dtos/Benefit.dto';

@ApiTags('Beneficios')
@Controller('benefit')
export class BenefitController {
  constructor(private readonly benefitService: BenefitService) {}

  @Get()
  getAllBenefits(): Promise<Benefit[]> {
    return this.benefitService.getAllBenefits();
  }

  @Get(':id')
  getOneBenefit(@Param('id', ParseUUIDPipe) id: string) {
    return this.benefitService.getOneBenefit(id);
  }

  @Post()
  createBenefit(@Body() benefit: BenefitDto) {
    return this.benefitService.createBenefit(benefit);
  }

  @Delete(':id')
  deleteBenefit(@Param('id', ParseUUIDPipe) id: string) {
    return this.benefitService.deleteBenefit(id);
  }
}
