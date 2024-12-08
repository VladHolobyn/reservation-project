import { InvitationDto } from './dto/invitation.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entity/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { FilterOperator, paginate, Paginated, PaginateQuery } from 'nestjs-paginate';
import { GroupShortDto } from './dto/group-short.dto';
import { plainToInstance } from 'class-transformer';
import { AuthService } from 'src/auth/auth.service';
import { GroupMember } from './entity/group-member.entity';
import { MembershipState } from './entity/membership-state.enum';

@Injectable()
export class GroupsService {

  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(GroupMember)
    private readonly groupMemberRepository: Repository<GroupMember>,

    private readonly userService: AuthService
  ) {}


  createGroup(createGroupDto: CreateGroupDto, userId: number) {
    const group: Group = new Group(createGroupDto);
    group.ownerId = userId;

    this.groupRepository.save(group);
  }

  async updateGroup(id: number, createGroupDto: CreateGroupDto, ownerId: number) {
    const group: Group = await this.getGroupAndCheckPermission(id, ownerId);

    Object.assign(group, createGroupDto)
    this.groupRepository.save(group);
  }

  async deleteGroup(id: number, ownerId: number) {
    const group: Group = await this.getGroupAndCheckPermission(id, ownerId);

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

//   async findAllGroupsManagedBy(ownerId: number): Promise<GroupShortDto[]> {
//     const list = await this.groupRepository.find({
//         relations: ['owner'],
//         where: {ownerId},

//     });

//     return list.map(entity => plainToInstance(GroupShortDto, entity, {
//         excludeExtraneousValues: true,
//       }));
//   }


    async invite(invitationDto: InvitationDto, ownerId: number) {
        const group: Group = await this.getGroupAndCheckPermission(invitationDto.groupId, ownerId);
        const user = await this.userService.findById(invitationDto.userId);
        
        if (!user) {
            throw new NotFoundException(`User with id: ${invitationDto.userId} does not exist`);
        }

        if (invitationDto.userId === group.ownerId) {
            throw new BadRequestException(`Owner cannot be invited`);
        }

        if (await this.groupMemberRepository.existsBy(
            {userId: invitationDto.userId, state: In([MembershipState.ACCEPTED, MembershipState.INVITED])}
        )) {
            throw new BadRequestException(`User is already invited`);
        }
        
        this.groupMemberRepository.save(invitationDto);

    }



    private async getGroupAndCheckPermission(groupId, userId): Promise<Group> {
        const group: Group = await this.groupRepository.findOneBy({ id: groupId });

        if(!group) {
            throw new NotFoundException(`Group with id: ${groupId} does not exist`);
        }
    
        if(userId !== group.ownerId) {
            throw new BadRequestException(`You are not an owner of this group`);
        }


        return group
    }
}
