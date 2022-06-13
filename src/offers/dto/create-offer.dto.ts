import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CreateOfferDto {
  @ApiProperty()
  @IsString()
  @IsIn(['fix', 'percent'])
  type: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  value: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  visible: boolean;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  product_id: number;
}
