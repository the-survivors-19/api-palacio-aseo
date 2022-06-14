import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString, MaxLength } from "class-validator";

export class CreateTestimonialDto {
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  description: string;

}
