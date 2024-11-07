import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

@Controller('groups')
export class GroupsController {
  constructor() {}

  @Post()
  create() {
    return "create a group";
  }

  @Get('managed')
  findManaged() {
    return "find all managed groups";
  }

  @Get('involved')
  findInvolved() {
    return "find all involved groups";
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return "find id: " + id;
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return "update id: " + id;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return "delete id: " + id;
  }

  @Post('members')
  addMember(){
    return "add member to the group";
  }

  @Delete('members')
  deleteMember(@Param('id') id:string) {
    return "delete member: "+id;
  }

  @Post('members/:id/approve')
  approveInvitation(@Param('id') id:string) {
    return "approved "+id;
  }

  @Post('members/:id/disapprove')
  disapproveInvitation(@Param('id') id:string) {
    return "disapproved "+id;
  }

  @Get('members/invitations')
  findAllMyInvitations() {
    return "my invitations";
  }

}
