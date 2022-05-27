import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
<<<<<<< HEAD
=======
import { Provider } from 'src/providers/entities/provider.entity';
import { ProvidersModule } from 'src/providers/providers.module';
>>>>>>> providers
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [User, Provider]
    }),
    AuthModule,
<<<<<<< HEAD
    UsersModule
=======
    UsersModule,
    ProvidersModule,
>>>>>>> providers
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(
    private connection: Connection
  ){}
}
