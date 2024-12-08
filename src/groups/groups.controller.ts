import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { Paginate, PaginateQuery } from 'nestjs-paginate';

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
  getAll(@Paginate() query: PaginateQuery) {
    return this.groupService.findAll(query);
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
