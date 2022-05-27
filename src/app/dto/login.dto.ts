<<<<<<< HEAD
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @IsEmail()
  email: string;

=======
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;
  
  @ApiProperty()
>>>>>>> providers
  @IsString()
  password: string;
}