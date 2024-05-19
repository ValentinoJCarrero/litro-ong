import { Injectable, NotFoundException } from '@nestjs/common';
import { VolunteerRepository } from './volunteer.repository';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';
import { Volunteer } from 'src/entities/Volunteer.entity';
import { User } from 'src/entities/User.entity';
import { UpdateResult } from 'typeorm';
import { EventDto } from 'src/dtos/Event.dto';

@Injectable()
export class VolunteerService {
  constructor(private readonly volunteerRepository: VolunteerRepository) {}

  getAllVolunteers(page: number, limit: number): Promise<Volunteer[]> {
    return this.volunteerRepository.getAllVolunteers(page, limit);
  }

  getVolunteer(id: string): Promise<Volunteer> {
    return this.volunteerRepository.getVolunteer(id);
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

  collaboratEevent(id: string, event: Partial<EventDto>) {
    return this.volunteerRepository.addVolunteer(id, event);
  }

  convertToVolunteer(id: string, volunteerData: VolunteerDto): Promise<User> {
    return this.volunteerRepository.convertToVolunteer(id, volunteerData);
  }
}
