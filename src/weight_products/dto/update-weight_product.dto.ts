import { PartialType } from '@nestjs/swagger';
import { CreateWeightProductDto } from './create-weight_product.dto';

export class UpdateWeightProductDto extends PartialType(CreateWeightProductDto) {}
