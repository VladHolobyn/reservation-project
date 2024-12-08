import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegistrationDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly entityManager: EntityManager,
        private readonly jwtService: JwtService,
    ) {}

    async registerUser(dto: RegistrationDto) {
        const emailInUse = await this.userRepository.exists({where: {email: dto.email}});

        if (emailInUse) {
            throw new BadRequestException("Email is already used");
        }

        const newUser: User = new User(dto);
        newUser.password = await bcrypt.hash(dto.password, 10);

        this.userRepository.save(newUser);
        // this.entityManager.save(newUser);
    }

    async login(dto: LoginDto): Promise<any> {
        const user: User = await this.userRepository.findOneBy({email: dto.email})

        if(!user) {
            throw new UnauthorizedException("Bad credentials");
        }

        if(! await bcrypt.compare(dto.password, user.password)) {
            throw new UnauthorizedException("Bad credentials");
        }


        return {
            accessToken: this.jwtService.sign({userId: user.id}, {expiresIn: '1h'})
        }  
    }

    async findById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOneBy({ id });
        return new UserDto(user);
    }
}
