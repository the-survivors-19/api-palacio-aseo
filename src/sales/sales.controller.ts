import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InsertSaleDto } from './dto/insert-sale.dto';
import { SalesDetailsService } from 'src/sales_details/sales_details.service';
import { CreateSaleDetailDto } from 'src/sales_details/dto/create-sale-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { JwtService } from '@nestjs/jwt';

@ApiTags('sales')
@Controller('sales')
@UseGuards(JwtAuthGuard)
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly jwtService: JwtService,
    private readonly salesDetailsService: SalesDetailsService,
  ) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto, @Headers('authorization') token) {
    const state = createSaleDto.state ?? 'PENDIENTE';
    const tokenJwt = token.split(' ')[1];
    const dataToken = this.jwtService.decode(tokenJwt);
    let total = 0;
    const data = {
      total,
      current_state: state,
      email_user: dataToken['email'],
      name_client: createSaleDto.name_client,
      address: createSaleDto.address
    }
    const sale_id = await this.salesService.create(data);
    const sale = await this.salesService.findOne(sale_id);

    for(let product of createSaleDto.products){
      const saleDetail: CreateSaleDetailDto = {
        sale_id: sale,
        product_id: product.id,
        quantity: product.quantity,
        price: product.price
      }
      
      await this.salesDetailsService.create(saleDetail);

      total += (product.price * product.quantity)
    }
    return (Boolean)(await this.salesService.update(sale_id, { total }));
  }

  @Get('/user/:id')
  async findForUser(@Param('id') id: string){
    return await this.salesService.findAll({ user: id })
  }

  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto) {
    return this.salesService.update(+id, updateSaleDto);
  }

}