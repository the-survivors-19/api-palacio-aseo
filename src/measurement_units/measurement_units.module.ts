import { Module } from '@nestjs/common';
import { MeasurementUnitsService } from './measurement_units.service';
import { MeasurementUnitsController } from './measurement_units.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MeasurementUnit } from './entities/measurement_unit.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MeasurementUnit])
  ],
  controllers: [MeasurementUnitsController],
  providers: [MeasurementUnitsService],
  exports: [MeasurementUnitsService]
})
export class MeasurementUnitsModule {}
