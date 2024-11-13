import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { SlotsModule } from './slots/slots.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}), DatabaseModule, 
    AuthModule, GroupsModule, SlotsModule 
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
