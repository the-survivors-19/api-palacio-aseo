import { Module } from '@nestjs/common';
import { SalesDetailsService } from './sales_details.service';
import { SalesDetailsController } from './sales_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesDetails } from './entities/sales_details.entity';
import { WeightProductsModule } from 'src/weight_products/weight_products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesDetails]),
    WeightProductsModule,
  ],
  controllers: [SalesDetailsController],
  providers: [SalesDetailsService],
  exports: [SalesDetailsService]
})
export class SalesDetailsModule {}
