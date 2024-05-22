import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Workshop } from 'src/entities/Workshop.entity';
import { WorkshopController } from './workshop.controller';
import { WorkshopService } from './workshop.service';
import { WorkshopRepository } from './workshop.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Workshop])],
  controllers: [WorkshopController],
  providers: [WorkshopService, WorkshopRepository],
})
export class WorkshopModule {}
