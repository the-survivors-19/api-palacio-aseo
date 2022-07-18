import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InsertSaleDto } from './dto/insert-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly userService: UsersService,
  ) {}

  async create(createSaleDto: InsertSaleDto): Promise<number> {
    const { email_user, ...data } = createSaleDto;
    const user = await this.userService.findEmail(email_user);
    const sale = await this.saleRepository.create(data);
    sale.user = user;
    sale.current_state = data.current_state;
    console.log(data);
    
    return (await this.saleRepository.save(sale)).id;
  }

  async findAll(where?: object): Promise<Sale[]> {
    return await this.saleRepository.find({
      where: {
        ...where,
      },
      order: {
        id: "DESC"
      },
      relations: ['sales_details', 'sales_details.product', 'sales_details.product.product_id']
    });
  }

  async findOne(id: number): Promise<Sale> {
    return await this.saleRepository.findOne(id);
  }

  async update(id: number, updateSaleDto: UpdateSaleDto): Promise<boolean> {
    return (Boolean) (await this.saleRepository.update(id, { current_state: updateSaleDto.state}));
  }
}
