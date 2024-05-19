import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';

@Injectable()
export class AuthService {
    constructor(private readonly authRepository: AuthRepository) {}

    signUp(user) {
        return this.authRepository.signUp(user);
    }

    googleSignUp(user) {
        return this.authRepository.googleSignUp(user);
    }

    signIn(user) {
        return this.authRepository.signIn(user);
    }

    googleSignIn(email) {
       return this.authRepository.googleSignIn(email);
    }
}
