import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, Min } from "class-validator";

export class CreateWeightProductDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  stock: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  measurement_unit_id: number;
}
