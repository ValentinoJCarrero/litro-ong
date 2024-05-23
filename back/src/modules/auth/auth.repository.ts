import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginUserDto, SignUpGoogle, UserDto } from 'src/dtos/User.dto';
 import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class AuthRepository {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService
  ) {}

  async signUp(user: UserDto) {
    const usersExists = await this.usersRepository.getUserByEmail(user.email);
    if (usersExists) throw new BadRequestException('El usuario ya existe.');

    user.email = user.email.toLowerCase();

    const hashedPassword = await bcrypt.hash(user.password, 10);
    await this.usersRepository.createUser({ ...user, password: hashedPassword });
    const { password, ...userWithoutPassword } = user;

    const userMailer = { name: user.fullName, email: user.email };
    await this.mailerService.sendWelcomeMail(userMailer);

    return userWithoutPassword;
  }

  async googleSignUp(user: SignUpGoogle) {
    const usersExists = await this.usersRepository.getUserByEmail(user.email);
    if (usersExists) throw new BadRequestException('El usuario ya existe.');

    await this.usersRepository.createUser(user);
    
    const userMailer = { name:user.fullName, email:user.email };
    await this.mailerService.sendWelcomeMail(userMailer);

    return user;
  }

  async signIn(user: LoginUserDto): Promise<{ token: string }> {
    const findUser = await this.usersRepository.getUserByEmail(user.email.toLowerCase());
    if (!findUser) throw new BadRequestException('Email o contraseña incorrectos.');
    const isPasswordValid = await bcrypt.compare(user.password, findUser.password);
    if (!isPasswordValid) throw new BadRequestException('Email o contraseña incorrectos.');

    const userPayload = { sub: findUser.id, email: findUser.email, roles: findUser.role };
    const token = await this.jwtService.signAsync({ userPayload });

    return { token };
  }

  async googleSignIn(email: string): Promise<{ token: string }> {
    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) throw new BadRequestException('Esta cuenta no se encuentra en nuestra base de datos.',);

    const userPayload = { sub: user.id, email: user.email, roles: [user.role] };
    const token = await this.jwtService.signAsync({ userPayload });

    return { token };
  }
}
