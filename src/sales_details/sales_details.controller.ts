import { Controller } from '@nestjs/common';
import { SalesDetailsService } from './sales_details.service';
import { CreateSaleDetailDto }  from './dto/create-sale-detail.dto';

@Controller('sales-details')
export class SalesDetailsController {
  constructor(private readonly salesDetailsService: SalesDetailsService) {}

  async create(createSaleDetail: CreateSaleDetailDto): Promise<boolean> {
    return (Boolean) (await this.salesDetailsService.create(createSaleDetail));
  }
}
