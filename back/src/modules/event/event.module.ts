import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
