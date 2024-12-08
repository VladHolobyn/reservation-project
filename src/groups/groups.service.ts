import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { log } from 'console';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}


  createGroup(createGroupDto: CreateGroupDto, userId: number) {
    const group: Group = new Group(createGroupDto);
    group.ownerId = userId;

    this.groupRepository.save(group);
  }

  async updateGroup(id: number, createGroupDto: CreateGroupDto, ownerId: number) {
    const group: Group = await this.groupRepository.findOneBy({ id });

    if(!group) {
        throw new NotFoundException(`Group with id: ${id} does not exist`);
    }

    if(ownerId !== group.ownerId) {
        throw new BadRequestException(`You are not an owner of this group`);
    }

    Object.assign(group, createGroupDto)
    this.groupRepository.save(group);
  }
}
