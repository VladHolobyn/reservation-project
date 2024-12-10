import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { SlotsService } from './slots.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RequestSlotDto } from './dto/request-slot.dto';

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
  create(@Body() createSlotDto: RequestSlotDto, @Req() request) {
    return this.slotService.createSlot(createSlotDto, request.userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string) {
    return "update slot: " + id;
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return "delete slot: " + id;
  }

  @Post(':id/publish')
  @UseGuards(AuthGuard)
  publish() {
    return "publish a slot";
  }

  @Patch(':id/end-status')
  @UseGuards(AuthGuard)
  mark() {
    return "complete a slot";
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
