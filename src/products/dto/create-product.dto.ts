import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { IsFile } from "src/helpers";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  category_id: number;
  
  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  provider_id: number;

  @ApiProperty()
  @IsOptional()
  img_1: any;

  @ApiProperty()
  @IsOptional()
  @IsFile({
    mime: ['image/jpeg', 'image/jpg', 'image/png']
  })
  img_2: any;
  
  @ApiProperty()
  @IsOptional()
  @IsFile({
    mime: ['image/jpeg', 'image/jpg', 'image/png']
  })
  img_3: any;
  
  @ApiProperty()
  @IsOptional()
  @IsFile({
    mime: ['image/jpeg', 'image/jpg', 'image/png']
  })
  img_4: any;

  code: string;
}
