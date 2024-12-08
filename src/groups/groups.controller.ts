import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupService: GroupsService
  ) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createGroupDto: CreateGroupDto, @Req() request) {
    return this.groupService.createGroup(createGroupDto, request.userId);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return "update id: " + id;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return "delete id: " + id;
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
