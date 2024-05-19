import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event.entity';
import { StorageService } from '../storage/storage.service';
import { Volunteer } from 'src/entities/Volunteer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Volunteer])],
  controllers: [EventController],
  providers: [EventService, EventRepository, StorageService],
})
export class EventModule {}
