import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    async signUp(user) {
        return this.authRepository.signUp(user);
    }

    async signIn(email, password) {
        return this.authRepository.signIn(email, password);
    }

    googleSignIn(email) {
       return this.authRepository.googleSignIn(email);
    }
}
