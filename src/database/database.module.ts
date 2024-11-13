import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => ({
                type: "postgres",
                host: "localhost",
                port: 5432,
                database: "test",
                username: "postgres",
                password: "1",
                autoLoadEntities: true,
                synchronize: true
            })
        })
    ]
})
export class DatabaseModule {}
