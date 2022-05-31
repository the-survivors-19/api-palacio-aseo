import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@UseGuards(JwtAuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Post()
  @UseInterceptors(
    FileInterceptor(
      'img_1',
      {
        storage: diskStorage({
          destination: `${process.env.PATH_IMAGES}/products`,
          filename: ({ body }, file, cb) => {
            cb(null, `${body.name}_${Date.now()}.png`);
          }
        })
      }
    )
  )
  async create(@UploadedFile() img_1: Express.Multer.File, @Body() createProductDto: CreateProductDto) {
    if (img_1) {
      createProductDto.img_1 = `${img_1.destination}/${img_1.filename}`;
    }
    return await this.productsService.create(createProductDto)
      ? { msg: 'se registro el producto correctamente' }
      : { msg: 'se presento un error al crear un producto' };
  }

  @Get()
  async findAll() {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor(
      'images',
      {
        storage: diskStorage({
          destination: `${process.env.PATH_IMAGES}/products`,
          filename: ({ body }, file, cb) => {
            cb(null, `${body.name}_${Date.now()}.png`);
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
      ? { msg: 'se actualizo el producto correctamente' }
      : { msg: 'se presento un error al actualizar un producto' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id)
      ? { msg: 'se elimino el producto correctamente' }
      : { msg: 'se presento un error al eliminar un producto' };
  }
}
