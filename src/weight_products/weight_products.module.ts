import { Module } from '@nestjs/common';
import { WeightProductsService } from './weight_products.service';
import { WeightProductsController } from './weight_products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightProduct } from './entities/weight_product.entity';
import { ProductsModule } from 'src/products/products.module';
import { MeasurementUnitsModule } from 'src/measurement_units/measurement_units.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeightProduct]),
    ProductsModule,
    MeasurementUnitsModule,
  ],
  controllers: [WeightProductsController],
  providers: [WeightProductsService],
  exports: [WeightProductsService]
})
export class WeightProductsModule {}
