import { CreateInvitationDto } from './dto/create-invitation.dto';
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
import { InvitationDto } from './dto/invitation.dto';
import { group } from 'console';

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

    if(await this.groupMemberRepository.existsBy({groupId: id, state: In([MembershipState.ACCEPTED, MembershipState.INVITED])})) {
        throw new BadRequestException(`There are active members in this group`);
    }

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


    async invite(invitationDto: CreateInvitationDto, ownerId: number) {
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

    async acceptInvitation(id: number, userId: number) {
        await this.changeInvitationState(id, userId, MembershipState.ACCEPTED);
    }

    async declineInvitation(id: number, userId: number) {
        await this.changeInvitationState(id, userId, MembershipState.DECLINED);
    }

    private async changeInvitationState(id: number, userId: number, state: MembershipState) {
        const invitation: GroupMember= await this.groupMemberRepository.findOneBy({id, userId, state: MembershipState.INVITED});

        if(!invitation) {
            throw new NotFoundException(`There is no such invitation`);
        }

        invitation.state = state;
        this.groupMemberRepository.update({id},invitation);
    }

    async findUserInvitations(userId: number) {
        return await this.groupMemberRepository.find({
            relations: {
                user: true,
                group: {
                    owner:true
                }
            },
            where: {
                userId,
                state: MembershipState.INVITED
            }
        }).then(data => data.map(entity =>  plainToInstance(InvitationDto, entity, {excludeExtraneousValues: true}) ))
    }

    async deleteMember(id: number, userId: number) {
        const member: GroupMember = await this.groupMemberRepository.findOne({
            relations: {group: true},
            where: {id, state: MembershipState.ACCEPTED}
        });

        if(!member || member.group.ownerId !== userId) {
            throw new NotFoundException(`There is no such invitation`);
        }

        // TODO: check for active slots

        member.state = MembershipState.DEACTIVATED;
        this.groupMemberRepository.update({id},member);
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
