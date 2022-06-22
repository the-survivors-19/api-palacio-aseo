import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor(
      'img_1',
      {
        storage: diskStorage({
          destination: `images/products`,
          filename: ({ body }, file, cb) => {
            const filename = `${body.name}`.replace(' ', '_') + Date.now() + '.png';
            cb(null, filename);
          }
        })
      }
    )
  )
  async create(@UploadedFile() img_1: Express.Multer.File, @Body() createProductDto: CreateProductDto) {
    
    if (img_1) {
      createProductDto.img_1 = img_1.path;
    }
    console.log(createProductDto);
    return await this.productsService.create(createProductDto)
      ? { message: 'se registro el producto correctamente' }
      : { message: 'se presento un error al crear un producto' };
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Get('admin')
  async findProducts() {
    return await this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'img_1',
      {
        storage: diskStorage({
          destination: `images/products`,
          filename: ({ body }, file, cb) => {
            const filename = `${body.name}`.replace(' ', '_') + Date.now() + '.png';
            cb(null, filename);
          }
        })
      }
    )
  )
  async update(@UploadedFile() img_1: Express.Multer.File, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    if (img_1) {
      updateProductDto.img_1 = `${img_1.destination}/${img_1.filename}`;
    }
    return await this.productsService.update(+id, updateProductDto)
      ? { message: 'se actualizo el producto correctamente' }
      : { message: 'se presento un error al actualizar un producto' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id)
      ? { message: 'se elimino el producto correctamente' }
      : { message: 'se presento un error al eliminar un producto' };
  }
}
