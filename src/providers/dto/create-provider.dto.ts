import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsPhoneNumber, IsString } from "class-validator";

export class CreateProviderDto {
  @ApiProperty()
  @IsString()
  name: string;
  
  @ApiProperty()
  @IsPhoneNumber('CO')
  phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  duty_manager: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}
