import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './event.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/entities/Event.entity';
import { ImagesModule } from 'src/functions/storage/images.module'; // Asegúrate de la ruta correcta

@Module({
  imports: [TypeOrmModule.forFeature([Event]), ImagesModule], // Importa el ImagesModule aquí
  controllers: [EventController],
  providers: [EventService, EventRepository],
})
export class EventModule {}
