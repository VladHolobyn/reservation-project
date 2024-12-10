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
    return this.groupService.getAll(query);
  }


  @Get('/involved/')
  @UseGuards(AuthGuard)
  findInvolved(@Paginate() query: PaginateQuery, @Req() request) {
    return this.groupService.getEnrolledGroups(query, request.userId);
  }
  
  @Get(':id')
  @UseGuards(AuthGuard)
  findOne(@Param('id') id: number, @Req() request) {
    return this.groupService.gettById(id, request.userId);
  }



  @Post('members')
  @UseGuards(AuthGuard)
  addMember(@Body() invitationDto: CreateInvitationDto, @Req() request){
    return this.groupService.invite(invitationDto, request.userId);
  }

  @Post('members/:id/approve')
  @UseGuards(AuthGuard)
  approveInvitation(@Param('id') id: number, @Req() request) {
    return this.groupService.acceptInvitation(id, request.userId);
  }

  @Post('members/:id/disapprove')
  @UseGuards(AuthGuard)
  disapproveInvitation(@Param('id') id: number, @Req() request) {
    return this.groupService.declineInvitation(id, request.userId);
  }

  @Delete('members/:id')
  @UseGuards(AuthGuard)
  deleteMember(@Param('id') id: number, @Req() request) {
    return this.groupService.deleteMember(id, request.userId);
  }

  @Get('members/invitations')
  @UseGuards(AuthGuard)
  findAllMyInvitations(@Req() request) {
    return this.groupService.getUserInvitations(request.userId);
  }

}
