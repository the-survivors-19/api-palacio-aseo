import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Max, MaxLength, Min } from "class-validator";

export class CreateRatingDto {
  @ApiProperty()
  @IsString()
  @MaxLength(200)
  description: string;
  
  @ApiProperty()
  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;

  @ApiProperty()
  @IsNumber()
  product_id: number;
}
