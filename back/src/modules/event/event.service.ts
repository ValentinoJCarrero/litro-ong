import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { EventDto } from 'src/dtos/Event.dto';
import { Event } from 'src/entities/Event.entity';
import { LessThan, MoreThan } from 'typeorm';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getAllEvent(
    limit: number,
    page: number,
  ): Promise<{ data: Event[]; total: number }> {
    const events = await this.eventRepository.getAllEvent(limit, page);
    if (events.data.length === 0) {
      throw new NotFoundException('No se encontraron eventos en esta pagina');
    } else {
      return events;
    }
  }
  async getPastEvents(): Promise<Event[]> {
    const currentDate = new Date();
    const pastEvents = await this.eventRepository.getFilterEvent({
      date: LessThan(currentDate),
    });
    if (pastEvents.length === 0) {
      throw new NotFoundException('No hay eventos pasados');
    }
    return pastEvents;
  }
  async getFutureEvents(): Promise<Event[]> {
    const currentDate = new Date();
    const futureEvents = await this.eventRepository.getFilterEvent({
      date: MoreThan(currentDate),
    });
    if (futureEvents.length === 0) {
      throw new NotFoundException('No hay eventos futuros');
    }
    return futureEvents;
  }

  async getOneEvent(title: string): Promise<Event> {
    const eventById: Event | null =
      await this.eventRepository.getOneEvent(title);
    if (!eventById) {
      throw new NotFoundException('Evento no encontrado');
    }
    return eventById;
  }

  async updateEvent(id: string, eventData: Partial<EventDto>) {
    const eventUpdated = await this.eventRepository.updateEvent(id, eventData);
    if (eventUpdated.affected === 0) {
      throw new NotFoundException(
        'No se encontró el evento que intentabas editar',
      );
    }
    return eventUpdated;
  }

  async createEvent(event: EventDto): Promise<Event> {
    try {
      return await this.eventRepository.createEvent(event);
    } catch (error) {
      if (
        (error as any).message?.includes('unicidad') ||
        (error as any).message?.includes('unique') ||
        (error as any).message?.includes('duplicate key')
      ) {
        throw new ConflictException(
          'Ya existe evento con el mismo titulo y fecha',
        );
      } else {
        throw error;
      }
    }
  }

  async deleteEvent(id: string) {
    const eventDeleted = await this.eventRepository.deleteEvent(id);
    if (eventDeleted.affected === 0) {
      throw new NotFoundException(
        'El evento que intentabas eliminar no se encontró en la base de datos',
      );
    }
    return eventDeleted;
  }

  async addVolunteer(id: string, event: Partial<Event>) {
    const eventFound = await this.eventRepository.getOneEvent(event.title);

    if (!eventFound) {
      throw new NotFoundException('El hay un evento registrado con ese titulo');
    }

    return this.eventRepository.addVolunteer(id, eventFound);
  }
}
