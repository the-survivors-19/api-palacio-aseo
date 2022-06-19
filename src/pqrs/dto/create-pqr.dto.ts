import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsString, MaxLength } from "class-validator";

export class CreatePqrDto {
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  description: string;

  @ApiProperty()
  @IsString()
  @IsIn(['peticion', 'queja', 'reclamo', 'sugerencia'])
  type_pqrs: string;
}
