import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SalesDetailsService } from 'src/sales_details/sales_details.service';
import { CreateSaleDetailDto } from 'src/sales_details/dto/create-sale-detail.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { JwtService } from '@nestjs/jwt';
import { WeightProductsService } from 'src/weight_products/weight_products.service';
import { MailService } from 'src/mail/mail.service';

@ApiTags('sales')
@Controller('sales')
export class SalesController {
  constructor(
    private readonly salesService: SalesService,
    private readonly jwtService: JwtService,
    private readonly salesDetailsService: SalesDetailsService,
    private readonly productService: WeightProductsService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createSaleDto: CreateSaleDto, @Headers('authorization') token) {
    const state = createSaleDto.state ?? 'PENDIENTE';
    const tokenJwt = token.split(' ')[1];
    const dataToken = this.jwtService.decode(tokenJwt);
    let total = 0;
    const data = {
      total,
      email_user: dataToken['email'],
      name_client: createSaleDto.name_client,
      address: createSaleDto.address,
      state: state
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
      const { stock } = await this.productService.findOne(product.id);
      await this.productService.update(product.id, { stock: (stock - saleDetail.quantity) });

      total += (product.price * product.quantity)
    }
    // await this.mailService.sendEmail({ email: data.email_user, context: { product: JSON.parse(JSON.stringify(createSaleDto.products)) }, subject: 'Tu pedido está pendiente', template: 'pendiente_shop' })
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

  @Get('products/:id')
  async findProducts(@Param('id') id: string){
    const products = [];
    const data = await this.salesDetailsService.find(+id);
    let name;
    for(let d of data){
      name = d.product.product_id.name;
      name += ` (`;
      name += d.product.quantity;
      name += d.product.measurement_unit_id.abbreviation;
      name += `) x`;
      name += d.quantity
      products.push({name, price: d.price, quantity: d.quantity})
    }
    return products;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSaleDto: UpdateSaleDto): Promise<String> {
    const res = await this.salesService.updateState(+id, updateSaleDto);
    return res ? 'Estado cambiado satisfactoriamente' : 'Se presento un error al cambiar el estado';
  }

}
