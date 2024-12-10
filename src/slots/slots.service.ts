import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './entity/slot.entity';
import { Between, Repository } from 'typeorm';
import { RequestSlotDto } from './dto/request-slot.dto';
import { AuthService } from 'src/auth/auth.service';
import { GroupsService } from 'src/groups/groups.service';
import { Group } from 'src/groups/entity/group.entity';


@Injectable()
export class SlotsService {
    constructor (
        @InjectRepository(Slot)
        private readonly slotRepository: Repository<Slot>,

        private readonly userService: AuthService,
        private readonly groupService: GroupsService
    ) {}
    

    async createSlot(createSlotDto: RequestSlotDto, userId: number) {
        const group: Group = await this.groupService.getGroupAndCheckPermission(createSlotDto.groupId, userId);
        
        if(createSlotDto.startDate > createSlotDto.endDate) {
            throw new BadRequestException('End date is before the Start date');
        }

        if(await this.overlapsWithOthers(createSlotDto.startDate, createSlotDto.endDate, userId)) {
            throw new BadRequestException('This time is scheduled');
        }

        if(createSlotDto.reserverId) {
            await this.userService.findById(createSlotDto.reserverId)
        }

        await this.slotRepository.save({...createSlotDto, ownerId: userId})
    }

    private async overlapsWithOthers(startDate, endDate, userId): Promise<boolean> {
        return await this.slotRepository.exists({
            where: [
                {startDate: Between(startDate, endDate), ownerId: userId},
                {endDate: Between(startDate, endDate), ownerId: userId},
            ]
        })
    }
}
