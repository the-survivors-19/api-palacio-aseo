import { PartialType } from '@nestjs/swagger';
import { CreateMeasurementUnitDto } from './create-measurement_unit.dto';

export class UpdateMeasurementUnitDto extends PartialType(CreateMeasurementUnitDto) {}
