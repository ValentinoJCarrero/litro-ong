import { Module } from '@nestjs/common';
import { BenefitController } from './benefit.controller';
import { BenefitService } from './benefit.service';
import { BenefitRepository } from './benefit.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Benefit } from 'src/entities/Benefit.entity';
import { StorageService } from '../storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Benefit])],
  controllers: [BenefitController],
  providers: [BenefitService, BenefitRepository, StorageService],
})
export class BenefitModule {}
