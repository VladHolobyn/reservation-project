import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';
import { CreateInvitationDto } from './dto/create-invitation.dto';

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
  @UseGuards(AuthGuard)
  update(@Param('id') id: number, @Body() createGroupDto: CreateGroupDto, @Req() request) {
    return this.groupService.updateGroup(id, createGroupDto, request.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: number, @Req() request) {
    return this.groupService.deleteGroup(id, request.userId);
  }

  @Get()
  @UseGuards(AuthGuard)
  getAll(@Paginate() query: PaginateQuery) {
    return this.groupService.findAll(query);
  }




  @Get('involved')
  @UseGuards(AuthGuard)
  findInvolved() {
    return "find all involved groups";
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: string) {
    return "find id: " + id;
  }



  @Post('members')
  @UseGuards(AuthGuard)
  addMember(@Body() invitationDto: CreateInvitationDto, @Req() request){
    return this.groupService.invite(invitationDto, request.userId);
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
  findAllMyInvitations(@Req() request) {
    return this.groupService.findUserInvitations(request.userId);
  }

}
