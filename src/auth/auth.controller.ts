import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    
    @Post('login')
    login(){
        return "login";
    }

    @Post('register')
    register(){
        return "register";
    }
}
