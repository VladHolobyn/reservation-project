import { Body, Param, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}
    
    @Post('login')
    login(){
        return "login";
    }

    @Post('register')
    register(@Body() createDto: CreateUserDto) {
        return this.authService.createUser(createDto);
    }

    @Get('users/:id')
    async findOne(@Param('id') id:string) {
        return this.authService.findById(+id);
    }
}
