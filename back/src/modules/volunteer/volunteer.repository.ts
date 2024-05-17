import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VolunteerDto } from 'src/dtos/Volunteer.dto';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { Volunteer } from 'src/entities/Volunteer.entity';

import { Repository } from 'typeorm';

@Injectable()
export class VolunteerRepository {
  constructor(
    @InjectRepository(Volunteer)
    private volunteerRepository: Repository<Volunteer>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  getAllVolunteers(limit: number, page: number): Promise<Volunteer[]> {
    return this.volunteerRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async convertToVolunteer(userId: string, volunteerData: VolunteerDto) {
    const queryRunner =
      this.volunteerRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: { role: true },
      });
      if (!user) {
        throw new NotFoundException('Usuario no encontrado');
      }
      console.log(user);

      const role = await this.roleRepository.findOne({
        where: { role: 'volunteer' },
      });
      if (!role) {
        throw new NotFoundException('Rol de voluntario no encontrado');
      }

      console.log(role);
      user.volunteerData = this.volunteerRepository.create({
        ...volunteerData,
        user: user,
      });

      user.role = [role];

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
/**({
        ...volunteerData,
        user: user,
        role: role,
      });
      await this.volunteerRepository.save(newVolunteer);

      if (!user.role.some(role => role.id === volunteerRole.id)) {
        user.role.push(volunteerRole);
        await this.userRepository.save(user);
      }
 */
