import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}


    async registerUser(dto: RegistrationDto) {
        const emailInUse = await this.userService.existsByEmail(dto.email);

        if (emailInUse) {
            throw new BadRequestException("Email is already used");
        }

        const newUser: User = new User(dto);
        newUser.password = await bcrypt.hash(dto.password, 10);

        this.userService.saveUser(newUser);
    }

    async login(dto: LoginDto): Promise<any> {
        const user: User = await this.userService.findByEmail(dto.email);

        if(!user || !await bcrypt.compare(dto.password, user.password)) {
            throw new UnauthorizedException("Bad credentials");
        }

        return {
            accessToken: this.jwtService.sign({userId: user.id}, {expiresIn: '1h'})
        }  
    }

}
