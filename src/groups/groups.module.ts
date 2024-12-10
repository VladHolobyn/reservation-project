import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { GroupsService } from './groups.service';
import { GroupMember } from './entity/group-member.entity';

@Module({
  controllers: [GroupsController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Group, GroupMember])
  ],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {}
