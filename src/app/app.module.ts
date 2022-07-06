import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { Category } from 'src/categories/entities/category.entity';
import { MeasurementUnit } from 'src/measurement_units/entities/measurement_unit.entity';
import { MeasurementUnitsModule } from 'src/measurement_units/measurement_units.module';
import { Offer } from 'src/offers/entities/offer.entity';
import { OffersModule } from 'src/offers/offers.module';
import { Pqrs } from 'src/pqrs/entities/pqr.entity';
import { PqrsModule } from 'src/pqrs/pqrs.module';
import { Product } from 'src/products/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { Provider } from 'src/providers/entities/provider.entity';
import { ProvidersModule } from 'src/providers/providers.module';
import { Testimonial } from 'src/testimonials/entities/testimonial.entity';
import { TestimonialsModule } from 'src/testimonials/testimonials.module';
import { User } from 'src/users/entities/user.entity';
import { UsersModule } from 'src/users/users.module';
import { WeightProduct } from 'src/weight_products/entities/weight_product.entity';
import { WeightProductsModule } from 'src/weight_products/weight_products.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../..', 'public/dist')
    }),
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
        MeasurementUnit,
        Offer,
        Testimonial,
        Pqrs,
        WeightProduct,
      ]
    }),
    AuthModule,
    UsersModule,
    ProvidersModule,
    CategoriesModule,
    ProductsModule,
    MeasurementUnitsModule,
    OffersModule,
    TestimonialsModule,
    PqrsModule,
    WeightProductsModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {
  constructor(
    private connection: Connection
  ){}
}
