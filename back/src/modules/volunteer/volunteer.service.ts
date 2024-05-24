import { Injectable, NotFoundException } from '@nestjs/common';
import { VolunteerRepository } from './volunteer.repository';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { UpdateResult } from 'typeorm';
import { EventDto } from 'src/dtos/Event.dto';

@Injectable()
export class VolunteerService {
  constructor(private readonly volunteerRepository: VolunteerRepository) {}

  async getAllVolunteers(
    page: number,
    limit: number,
  ): Promise<{ data: Volunteer[]; total: number }> {
    const allVolunteers = await this.volunteerRepository.getAllVolunteers(
      page,
      limit,
    );
    if (allVolunteers.data.length === 0) {
      throw new NotFoundException('No hay voluntarios en esta pagina');
    } else {
      return allVolunteers;
    }
  }

  async getVolunteer(id: string): Promise<Volunteer> {
    const volunteerFound = await this.volunteerRepository.getVolunteer(id);
    if (!volunteerFound) {
      throw new NotFoundException('No se encontro el voluntario');
    } else {
      return volunteerFound;
    }
  }

  async updateVolunteer(
    id: string,
    newData: Partial<VolunteerDto>,
  ): Promise<UpdateResult> {
    const volunteer = await this.volunteerRepository.getVolunteer(id);
    if (!volunteer) {
      throw new NotFoundException(
        'No se encontro el voluntario, modificación no realizada',
      );
    }
    return this.volunteerRepository.updateVolunteer(id, newData);
  }

  async deleteVolunteer(id: string) {
    const volunteerData = await this.volunteerRepository.getVolunteer(id);
    if (!volunteerData) {
      throw new NotFoundException('No se encontro el voluntario');
    }
    return this.volunteerRepository.deleteVolunteer(volunteerData);
  }

  async removeEvent(idVolunteer: string, idEvent: string): Promise<Volunteer> {
    const volunteerFound =
      await this.volunteerRepository.getVolunteer(idVolunteer);
    if (!volunteerFound) {
      throw new NotFoundException('No se encontro el voluntario');
    }
    const existingEvent = volunteerFound.events.some(
      (event) => event.id === idEvent,
    );
    if (!existingEvent) {
      throw new NotFoundException(
        'El evento que intentabas desvincular, no esta relacionado con el voluntario',
      );
    }

    volunteerFound.events = volunteerFound.events.filter(
      (event) => event.id !== idEvent,
    );
    return await this.volunteerRepository.removeEvent(volunteerFound);
  }

  collaboratEevent(id: string, event: Partial<EventDto>) {
    return this.volunteerRepository.addVolunteer(id, event);
  }

  convertToVolunteer(
    id: string,
    volunteerData: VolunteerDto,
  ): Promise<Volunteer> {
    return this.volunteerRepository.convertToVolunteer(id, volunteerData);
  }
}
