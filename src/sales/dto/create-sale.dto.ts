import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsOptional, IsString } from "class-validator";
import { WeightProduct } from "src/weight_products/entities/weight_product.entity";

export class CreateSaleDto {
  @ApiProperty()
  @IsArray()
  products: WeightProduct[]

  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsIn(['PENDIENTE', 'EMPACANDO', 'ENVIADO', 'ENTREGADO'])
  state: string;

  @ApiProperty()
  @IsString()
  name_client: string;

  @ApiProperty()
  @IsString()
  address: string;

}
