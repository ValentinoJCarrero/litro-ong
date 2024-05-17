import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDto } from 'src/dtos/Event.dto';
import { Event } from 'src/entities/Event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventRepository {
  constructor(
    @InjectRepository(Event) private EventRepository: Repository<Event>,
  ) {}

  getAllEvent(limit: number, page: number): Promise<Event[]> {
    return this.EventRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { volunteer: true },
    });
  }

  getFilterEvent(filter): Promise<Event[]> {
    return this.EventRepository.findBy(filter);
  }

  getOneEvent(title: string): Promise<Event> {
    return this.EventRepository.findOne({ where: { title: title } });
  }
  updateEvent(id: string, eventData: Partial<EventDto>) {
    return this.EventRepository.update(id, eventData);
  }

  createEvent(Event: EventDto): Promise<Event> {
    return this.EventRepository.save(Event);
  }

  deleteEvent(id: string) {
    return this.EventRepository.delete(id);
  }
}
