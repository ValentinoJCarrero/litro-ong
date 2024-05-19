import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventDto } from 'src/dtos/Event.dto';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';
import { Event } from 'src/entities/Event.entity';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { Volunteer } from 'src/entities/Volunteer.entity';

import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class VolunteerRepository {
  constructor(
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  getAllVolunteers(limit: number, page: number): Promise<Volunteer[]> {
    return this.volunteerRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: { user: true, events: true },
    });
  }

  getVolunteer(id: string): Promise<Volunteer> {
    return this.volunteerRepository.findOne({
      where: { id },
      relations: { user: true, events: true },
    });
  }

  updateVolunteer(
    id: string,
    newData: Partial<VolunteerDto>,
  ): Promise<UpdateResult> {
    return this.volunteerRepository.update(id, newData);
  }

  async deleteVolunteer(volunteerData: Volunteer): Promise<User> {
    const queryRunner =
      this.volunteerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      await this.volunteerRepository.remove(volunteerData);

      const user: User | null = await this.userRepository.findOne({
        where: { id: volunteerData.user.id },
        relations: { role: true },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      user.role = user.role.filter((r) => r.role !== 'voluntario');

      await this.userRepository.save(user);

      await queryRunner.commitTransaction();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async addVolunteer(id: string, event: Partial<EventDto>) {
    const queryRunner =
      this.volunteerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const volunteerFound = await this.volunteerRepository.findOne({
        where: { id: id },
      });

      if (!volunteerFound) {
        throw new NotFoundException('Voluntario no encontrado');
      }

      const eventFound = await this.eventRepository.findOne({
        where: { title: event.title },
        relations: { volunteer: true },
      });
      if (!eventFound) {
        throw new NotFoundException('Evento no encontrado');
      }

      eventFound.volunteer.push(volunteerFound);

      await this.eventRepository.save(eventFound);
      await queryRunner.commitTransaction();
      return volunteerFound;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async convertToVolunteer(
    id: string,
    volunteerData: VolunteerDto,
  ): Promise<User> {
    const queryRunner =
      this.volunteerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: { role: true, volunteerData: true },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }

      if (user.role.some((userRole) => userRole.role === 'Volunteer')) {
        throw new ConflictException('El usuario ya es voluntario');
      }

      //const role = await this.roleRepository.findOne({
      //  where: { role: 'Volunteer' },
      //});
      //if (!role) {
      //  throw new NotFoundException('Rol de voluntario no encontrado');
      //}

      const volunterData = this.volunteerRepository.create({
        ...volunteerData,
        user: user,
      });

      await this.volunteerRepository.save(volunterData);
      user.volunteerData = volunterData;
      //user.role = [...user.role, role];

      await this.userRepository.save(user);
      await queryRunner.commitTransaction();
      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
