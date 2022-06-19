import { Module } from '@nestjs/common';
import { PqrsService } from './pqrs.service';
import { PqrsController } from './pqrs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pqrs } from './entities/pqr.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pqrs]),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '6h',
        },
      }),
    }),
  ],
  controllers: [PqrsController],
  providers: [PqrsService],
  exports: [PqrsService],
})
export class PqrsModule {}
