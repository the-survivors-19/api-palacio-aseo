import { States } from "../entities/sale.entity";

export class InsertSaleDto {
  total: number;
  current_state: States;
  email_user: string;
  name_client: string;
  address: string;
}