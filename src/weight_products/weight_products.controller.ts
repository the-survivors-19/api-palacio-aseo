import { Controller, Get, Post, Body, Patch, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { WeightProductsService } from './weight_products.service';
import { CreateWeightProductDto } from './dto/create-weight_product.dto';
import { UpdateWeightProductDto } from './dto/update-weight_product.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';

@ApiTags('weight products')
@Controller('weight-products')
@UseGuards(JwtAuthGuard)
export class WeightProductsController {
  constructor(private readonly weightProductsService: WeightProductsService) {}

  @Post()
  create(@Body() createWeightProductDto: CreateWeightProductDto) {
    return this.weightProductsService.create(createWeightProductDto);
  }

  @Get()
  findAll() {
    return this.weightProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.weightProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWeightProductDto: UpdateWeightProductDto) {
    return this.weightProductsService.update(+id, updateWeightProductDto);
  }

  @Put(':id')
  updateJava(@Param('id') id: string, @Body() updateWeightProductDto: UpdateWeightProductDto) {
    return this.weightProductsService.update(+id, updateWeightProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.weightProductsService.remove(+id);
  }
}
