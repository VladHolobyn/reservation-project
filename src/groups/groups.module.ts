import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entity/group.entity';
import { GroupsService } from './groups.service';

@Module({
  controllers: [GroupsController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Group])
  ],
  providers: [GroupsService]
})
export class GroupsModule {}
