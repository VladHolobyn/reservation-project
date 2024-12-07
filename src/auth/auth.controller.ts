import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}    

    @Post('register')
    register(@Body() registrationDto: RegistrationDto) {
        return this.authService.registerUser(registrationDto);
    }
    
    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto);
    }

    @Get('users/:id')
    async findOne(@Param('id') id:string) {
        return this.authService.findById(+id);
    }
}
