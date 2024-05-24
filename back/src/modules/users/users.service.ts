import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/User.entity';
import { UserDto } from 'src/dtos/User.dto';

import * as bcrypt from 'bcrypt';
import { UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getAllUsers(
    page: number,
    limit: number,
  ): Promise<{ data: User[]; total: number }> {
    const allUsers = await this.usersRepository.getAllUsers(page, limit);
    if (allUsers.data.length === 0) {
      throw new NotFoundException('No se encontraron usuarios en esta pagina');
    } else {
      return allUsers;
    }
  }

  async getUser(id: string): Promise<User> {
    const userFound = await this.usersRepository.getUser(id);
    if (!userFound) {
      throw new NotFoundException(
        'No se encontro al usuario por el id ingresado',
      );
    } else {
      return userFound;
    }
  }

  async updateUser(id: string, user: Partial<UserDto>): Promise<UpdateResult> {
    const userFound = await this.usersRepository.getUser(id);
    if (!userFound) {
      throw new NotFoundException(
        'No se encontro al usuario por el id ingresado, modificación no realizada',
      );
    }
    if (user.password) {
      const passwordHash: string = await bcrypt.hash(user.password, 10);

      user = { ...user, password: passwordHash };
      return await this.usersRepository.updateUser(id, user);
    } else {
      return await this.usersRepository.updateUser(id, user);
    }
  }

  async deleteUser(id: string): Promise<User> {
    const userFound = await this.usersRepository.getUser(id);
    if (!userFound) {
      throw new NotFoundException(
        'No se encontro al usuario por el id ingresado, eliminación no realizada',
      );
    }
    return await this.usersRepository.deleteUser(userFound);
  }

  //para pruebas(asi no toco lo de valen), eliminar despues
  createUser(user) {
    return this.usersRepository.createUser(user);
  }


}
