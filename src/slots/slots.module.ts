import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { AuthModule } from 'src/auth/auth.module';
import { GroupsModule } from 'src/groups/groups.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slot } from './entity/slot.entity';

@Module({
  controllers: [SlotsController],
  imports: [
    AuthModule, GroupsModule,
    TypeOrmModule.forFeature([Slot])
  ],
  providers: [SlotsService]
})
export class SlotsModule {}
