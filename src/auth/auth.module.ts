import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from './guards/auth.guard';
import { UsersService } from './users.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            inject: [ConfigService],
            global: true,
            useFactory: async (configService: ConfigService) => ({
              secret: configService.getOrThrow("JWT_SECRET")
            })
          }), 
    ],
    controllers: [AuthController],
    providers: [AuthGuard, AuthService, UsersService],
    exports: [AuthGuard, AuthService, UsersService],
})
export class AuthModule {}
