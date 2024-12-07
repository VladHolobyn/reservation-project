import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {


    constructor(
        private readonly entityManager: EntityManager,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    createUser(dto: CreateUserDto) {
        const newUser: User = new User(dto);
        this.entityManager.save(newUser);
    }

    async findById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOneBy({ id });
        return new UserDto(user);
    }
}
