import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('slots')
export class SlotsController {
    constructor() {}

  @Get()
  findAll() {
    return "find all slots";
  }

  @Get('available')
  findAvailable() {
    return "available slots";
  }

  @Post()
  create() {
    return "create a slot";
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return "update slot: " + id;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return "delete slot: " + id;
  }

  @Post(':id/publish')
  publish() {
    return "publish a slot";
  }

  @Post(':id/complete')
  complete() {
    return "complete a slot";
  }

  @Post(':id/miss')
  miss() {
    return "miss a slot";
  }

  @Post(':id/reserve')
  reserve() {
    return "reserve a slot";
  }

  @Post(':id/cancel')
  cancel() {
    return "cancel a slot";
  }

}
