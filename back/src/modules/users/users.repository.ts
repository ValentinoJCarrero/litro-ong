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

<<<<<<< HEAD
    async createUser(user): Promise<Partial<User>> {
        const newUser = await this.usersRepository.save(user);
=======
  async createUser(user): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);
>>>>>>> 5daf07b82706886d7424855b6c5fa80019229451

    return newUser;
  }

  getAllUsers(page: number, limit: number): Promise<User[]> {
    return this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
      relations: {
        volunteerData: {
          events: true,
        },
        partnerData: { cardData: true },
      },
    });
  }

  getUser(id: string): Promise<User> {
    return this.usersRepository.findOne({
      where: { id },
      relations: {
        volunteerData: {
          events: true,
        },
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
