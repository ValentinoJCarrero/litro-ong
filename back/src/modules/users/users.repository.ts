import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from 'src/dtos/User.dto';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }

  async createUser(user: UserDto): Promise<Partial<User>> {
    const newUser = await this.usersRepository.save(user);

    return newUser;
  }

  getAllUsers(page: number, limit: number) {
    return this.usersRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  getUser(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  updateUser(user) {
    return this.usersRepository.update(user.id, user);
  }

  deleteUser(id: string) {
    return this.usersRepository.delete(id);
  }
}
