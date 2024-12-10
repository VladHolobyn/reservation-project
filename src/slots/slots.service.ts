import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Slot } from './entity/slot.entity';
import { Brackets, Repository } from 'typeorm';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { AuthService } from 'src/auth/auth.service';
import { GroupsService } from 'src/groups/groups.service';
import { SlotState } from './entity/slot-state.enum';
import { CreateSlotDto } from './dto/create-slot.dto';


@Injectable()
export class SlotsService {

    constructor (
        @InjectRepository(Slot)
        private readonly slotRepository: Repository<Slot>,

        private readonly userService: AuthService,
        private readonly groupService: GroupsService
    ) {}
    

    async createSlot(createSlotDto: CreateSlotDto, userId: number) {
        await this.validateSlot(createSlotDto, userId, null);
        await this.slotRepository.save({...createSlotDto, ownerId: userId})
    }

    async updateSlot(id: number, updateSlotDto: UpdateSlotDto, userId: number) {
        const slot: Slot = await this.findById(id);

        if (![SlotState.AVAILABLE, SlotState.DRAFT].includes(slot.state)) {
            throw new BadRequestException('Slot cannot be updated in this state');
        }

        const newSlot: Slot = Object.assign(slot, updateSlotDto); 
        await this.validateSlot(newSlot, userId, id);

        await this.slotRepository.update({id}, newSlot)
    }

    async deleteSlot(id: number, userId: number) {
        const slot: Slot = await this.findById(id);

        await this.groupService.getGroupAndCheckPermission(slot.groupId, userId);

        if (![SlotState.AVAILABLE, SlotState.DRAFT].includes(slot.state)) {
            throw new BadRequestException('Slot cannot be deleted in this state');
        }

        await this.slotRepository.remove(slot);

      }

    async publishSlot(id: number, userId: any) {
        const slot: Slot = await this.findById(id);

        await this.groupService.getGroupAndCheckPermission(slot.groupId, userId);

        if (slot.state !==  SlotState.DRAFT) {
            throw new BadRequestException('Only the DRAFT slot can be published');
        }

        slot.state = SlotState.AVAILABLE;
        await this.slotRepository.update({id}, slot)
    }      

    async markSlotAs(id: number, state: SlotState, userId: any) {
        const slot: Slot = await this.findById(id);

        await this.groupService.getGroupAndCheckPermission(slot.groupId, userId);

        slot.state = state;
        await this.slotRepository.update({id}, slot)
    }

    async findById(id: number) {
        const slot: Slot = await this.slotRepository.findOneBy({id});

        if (!slot) {
            throw new NotFoundException(`Slot with id: ${id} does not exist`);
        }

        return  slot;
    }




    private async validateSlot(requestDto: Partial<Slot>, userId: number, slotId: number) {
        await this.groupService.getGroupAndCheckPermission(requestDto.groupId, userId);

        const startDate = new Date(requestDto.startDate);
        const endDate = new Date(requestDto.endDate)

        if(startDate > endDate) {
            throw new BadRequestException('End date is before the Start date');
        }

        if(await this.overlapsWithOthers(startDate, endDate, userId, slotId)) {
            throw new BadRequestException('This time is scheduled');
        }

        if(requestDto.reserverId) {
            await this.userService.findById(requestDto.reserverId)
        }
    }

    private async overlapsWithOthers(startDate, endDate, userId, slotId): Promise<boolean> {
        let query = this.slotRepository.createQueryBuilder('slot')
        .where(new Brackets(qb => {
            qb.where(
                new Brackets((qb) => {
                  qb.where(':startDate BETWEEN slot.startDate AND slot.endDate')
                    .orWhere(':endDate BETWEEN slot.startDate AND slot.endDate');
                }),
              )
              .orWhere(
                new Brackets((qb) => {
                  qb.where('slot.startDate BETWEEN :startDate AND :endDate')
                    .orWhere('slot.endDate BETWEEN :startDate AND :endDate');
                }),
              )
        }))
          .andWhere(':ownerId = slot.ownerId');

        if(slotId) {
            query = query.andWhere('slot.id != :slotId')
        }

        return await query
          .setParameters({ startDate, endDate, ownerId: userId, ...(slotId && { slotId })}).getExists();
    }
}
