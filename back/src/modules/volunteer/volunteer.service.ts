import { Injectable } from '@nestjs/common';
import { VolunteerRepository } from './volunteer.repository';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';

@Injectable()
export class VolunteerService {
  constructor(private readonly volunteerRepository: VolunteerRepository) {}

  getAllVolunteers(page: number, limit: number) {
    return this.volunteerRepository.getAllVolunteers(page, limit);
  }

  convertToVolunteer(userId: string, volunteerData: VolunteerDto) {
    return this.volunteerRepository.convertToVolunteer(userId, volunteerData);
  }
}
