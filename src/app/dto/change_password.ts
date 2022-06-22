import { ApiProperty } from "@nestjs/swagger";
import { IsJWT } from "class-validator";

export class ChangePassword {
  @ApiProperty()
  @IsJWT()
  token: string;
}