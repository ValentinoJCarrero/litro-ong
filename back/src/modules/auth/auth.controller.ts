import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, loginUserDto } from 'src/dtos/User.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    @ApiOperation({ summary: 'Registro de usuario.', description: 'Este endpoint registra un usuario.' })
    async signUp(@Body() user: UserDto) {
        return this.authService.signUp(user);
    }

    @Post('signin')
    @ApiOperation({ summary: 'Inicio de sesión.', description: 'Este endpoint inicia la sesión del usuario. El usuario debe estar registrado.' })
    async signIn(@Body() user: loginUserDto) {
        return this.authService.signIn(user.email, user.password);
    }

    @Post('googlesignin')
    @ApiOperation({ summary: 'Inicio de sesión con Google.', description: 'Este endpoint inicia la sesión del usuario mediante Google. El usuario debe estar registrado.' })
    async googleSignIn(@Body() user: Partial<loginUserDto>) {
        return this.authService.googleSignIn(user.email);
    }
}