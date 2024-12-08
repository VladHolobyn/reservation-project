import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { GroupShortDto } from './dto/group-short.dto';
import { instanceToInstance, plainToClass, plainToInstance } from 'class-transformer';
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
    this.groupRepository.find
  }

  async deleteGroup(id: number, ownerId: number) {
    const group: Group = await this.groupRepository.findOneBy({ id });

    if(!group) {
        throw new NotFoundException(`Group with id: ${id} does not exist`);
    }

    if(ownerId !== group.ownerId) {
        throw new BadRequestException(`You are not an owner of this group`);
    }

    // TODO: check for members
    this.groupRepository.delete(group);
  }


  async findAll(query: PaginateQuery) {
    const pagable = await paginate(query, this.groupRepository, {
        sortableColumns: ['id'],
        searchableColumns: ['name', 'ownerId'],
        filterableColumns: {
          name: [FilterOperator.ILIKE],
          ownerId: [FilterOperator.EQ]
        },
        relations: ['owner']
      });

    return {
      ...pagable,
      data: pagable.data.map((entity) =>
        plainToInstance(GroupShortDto, entity, {
            excludeExtraneousValues: true,
          })
      ),
    };
  }

}
