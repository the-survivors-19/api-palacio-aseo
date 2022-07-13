import { Sale } from "src/sales/entities/sale.entity";

export class CreateSaleDetailDto {
  quantity: number;
  price: number;
  sale_id: Sale;
  product_id: number;
}