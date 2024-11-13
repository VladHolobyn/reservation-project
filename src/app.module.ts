import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { SlotsModule } from './slots/slots.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [AuthModule, GroupsModule, SlotsModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
