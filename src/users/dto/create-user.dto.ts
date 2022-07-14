import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsPhoneNumber, IsString, MaxLength, MinLength } from "class-validator";
import { IsFile } from "src/helpers";

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @MaxLength(45)
  full_name: string;

  @ApiProperty()
  @IsPhoneNumber('CO')
  phone: string;

  @ApiProperty()
  @IsString()
  @MaxLength(45)
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(8)
  password_confirmation: string;

}
