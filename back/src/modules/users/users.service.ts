import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from 'src/entities/User.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async getAllUsers(page: number, limit: number) {
    return await this.usersRepository.getAllUsers(page, limit);
  }

  async getUser(id: string): Promise<User> {
    const userFound = await this.usersRepository.getUser(id);
    if (!userFound) {
      throw new NotFoundException(
        'No se encontro al usuario por el id ingresado',
      );
    }
    return userFound;
  }

  async updateUser(id: string, user: Partial<User>) {
    const userFound = await this.usersRepository.getUser(id);
    if (!userFound) {
      throw new NotFoundException(
        'No se encontro al usuario por el id ingresado, modificación no realizada',
      );
    }
    return this.usersRepository.updateUser(user);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  //para pruebas(asi no toco lo de valen), eliminar despues
  createUser(user) {
    return this.usersRepository.createUser(user);
  }
}
