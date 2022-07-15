import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WeightProductsService } from 'src/weight_products/weight_products.service';
import { Repository } from 'typeorm';
import { CreateSaleDetailDto } from './dto/create-sale-detail.dto';
import { SalesDetails } from './entities/sales_details.entity';

@Injectable()
export class SalesDetailsService {
  constructor(
    @InjectRepository(SalesDetails)
    private readonly saleDetailRepository: Repository<SalesDetails>,
    private readonly productsService: WeightProductsService
  ){}

  async create(createSale: CreateSaleDetailDto): Promise<boolean> {
    const { product_id, sale_id, ...data } = createSale;
    const product = await this.productsService.findOne(product_id);
    const saleDetail = await this.saleDetailRepository.create(data);
    saleDetail.product = product;
    saleDetail.sale = sale_id;
    
    return (Boolean) (await this.saleDetailRepository.save(saleDetail));
  }

  async find(id: number): Promise<SalesDetails[]>{
    return await this.saleDetailRepository.find({
      where: {
        sale: id
      },
      relations: ['product', 'product.product_id', 'product.measurement_unit_id']
    })
  }
}
