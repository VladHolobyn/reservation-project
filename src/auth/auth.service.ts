import { BadRequestException, Injectable } from '@nestjs/common';
import { RegistrationDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly entityManager: EntityManager,
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

    async findById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOneBy({ id });
        return new UserDto(user);
    }
}
