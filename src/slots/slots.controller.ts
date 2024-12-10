import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { UpdateSlotDto } from './dto/update-slot.dto';
import { CreateSlotDto } from './dto/create-slot.dto';
import { SlotState } from './entity/slot-state.enum';

@Controller('slots')
export class SlotsController {
    constructor(
      private readonly slotService: SlotsService
    ) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll() {
    return "find all slots";
  }

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createSlotDto: CreateSlotDto, @Req() request) {
    return this.slotService.createSlot(createSlotDto, request.userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() updateSlotDto: UpdateSlotDto, @Req() request) {
    return this.slotService.updateSlot(id, updateSlotDto, request.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @Req() request) {
    return this.slotService.deleteSlot(id, request.userId);
  }

  @Post(':id/publish')
  @UseGuards(AuthGuard)
  publish(@Param('id') id: number, @Req() request) {
    return this.slotService.publishSlot(id, request.userId);
  }

  @Patch(':id/end-state')
  @UseGuards(AuthGuard)
  mark(@Param('id') id: number,@Body() stateDto: {state: SlotState}, @Req() request) {
    return this.slotService.markSlotAs(id, stateDto.state, request.userId)
  }

  @Post(':id/reserve')
  @UseGuards(AuthGuard)
  reserve() {
    return "reserve a slot";
  }

  @Post(':id/cancel')
  @UseGuards(AuthGuard)
  cancel() {
    return "cancel a slot";
  }

}
