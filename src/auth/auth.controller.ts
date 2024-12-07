import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/create-user.dto';

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
    login(){
        return "login";
    }

    @Get('users/:id')
    async findOne(@Param('id') id:string) {
        return this.authService.findById(+id);
    }
}
