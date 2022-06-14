import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";


export class CreateMeasurementUnitDto {
  @ApiProperty()
  @IsString()
  @MaxLength(20)
  unit: string;

  @ApiProperty()
  @IsString()
  @MaxLength(3)
  abbreviation: string;
}
