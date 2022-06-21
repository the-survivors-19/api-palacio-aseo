import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.create(createCategoryDto) 
      ? { message: 'La categoria fue creada existosamente'} 
      : { message: 'Se presento un fallo al crear la categoria' };
  }

  @Get()
  async findAll() {
    return await this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoriesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(+id, updateCategoryDto) 
      ? { message: 'se edito la categoria correctamente' } 
      : { message: 'se presento un fallo al actualizar' };
  }

  @Put(':id')
  async updateJava(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoriesService.update(+id, updateCategoryDto) 
      ? { message: 'se edito la categoria correctamente' } 
      : { message: 'se presento un fallo al actualizar' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.categoriesService.remove(+id)
      ? { message: 'se elimino la categoria correctamente' } 
      : { message: 'se presento un fallo al eliminar' };
  }
}
