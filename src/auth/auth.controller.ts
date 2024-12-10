import { Body, Param, Controller, Post, Get, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistrationDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from './users.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService
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
    @UseGuards(AuthGuard)
    getById(@Param('id') id:number) {
        return this.userService.getById(id);
    }
}
