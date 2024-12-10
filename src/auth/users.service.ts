import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}


    async getById(id:number): Promise<UserDto> {
        return plainToInstance(UserDto, await this.findById(id), {
            excludeExtraneousValues: true,
        })
    }



    async findById(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ id });

        if(!user) {
            throw new NotFoundException(`User with id:${id} not found`);
        }

        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user: User = await this.userRepository.findOneBy({email})

        if(!user) {
            throw new NotFoundException(`User with email:${email} not found`);
        }
        return user;
    }

    async existsByEmail(email) {
        return await this.userRepository.existsBy({email});
    }

    async saveUser(user: User) {
        await this.userRepository.save(user);
    }
}
