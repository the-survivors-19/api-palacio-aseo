import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entities/category.entity';
import { MeasurementUnit } from 'src/measurement_units/entities/measurement_unit.entity';
import { MeasurementUnitsModule } from 'src/measurement_units/measurement_units.module';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProvidersModule } from 'src/providers/providers.module';
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
      entities: [
        User,
        Provider,
        Category,
        Product,
        MeasurementUnit
      ]
    }),
    AuthModule,
    UsersModule,
    ProvidersModule,
    CategoriesModule,
    ProductsModule,
    MeasurementUnitsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(
    private connection: Connection
  ){}
}
