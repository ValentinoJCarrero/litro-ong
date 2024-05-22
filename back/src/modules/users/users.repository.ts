import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/User.dto';
import { User } from 'src/entities/User.entity';

import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async createUser(user): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }> {
    const [data, total] = await this.usersRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        volunteerData: {
          events: { volunteer: false },
        },
        partnerData: { cardData: true },
        role: true,
        donations: true,
      },
    });
    return { data, total };
  }

  getUser(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        volunteerData: {
          events: { volunteer: false },
        },
        partnerData: { cardData: true },
        role: true,
        donations: true,
      },
    });
  }

  updateUser(id: string, user: Partial<UserDto>): Promise<UpdateResult> {
    return this.usersRepository.update(id, user);
  }

  deleteUser(userFound: User): Promise<User> {
    return this.usersRepository.remove(userFound);
  }
}
