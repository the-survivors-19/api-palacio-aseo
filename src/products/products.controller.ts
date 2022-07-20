import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile, Put, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }

  @Post()
  @UseInterceptors(
    FilesInterceptor('images')
  )
  async create(@UploadedFiles() images: Array<Express.Multer.File>, @Body() createProductDto: CreateProductDto) {
    const consecutive = (await this.productsService.findAll({category_id: createProductDto.category_id})).length + 1;
    createProductDto.code = `${ createProductDto.category_id }${ consecutive }`;
    console.log(images);
    
    for(let image in images){
      createProductDto[`img_${parseInt(image)+1}`] = await (await this.cloudinaryService.uploadImage(images[image])).secure_url;
    }
    /* if (img_1) {
      createProductDto.img_1 = img_1.path;
    } */
    console.log(createProductDto);
    return await this.productsService.create(createProductDto)
      ? 'se registro el producto correctamente'
      : 'se presento un error al crear un producto';
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
    FilesInterceptor('images')
  )
  async update(@UploadedFiles() images: Express.Multer.File, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    for(let image in images){
      updateProductDto[`img_${parseInt(image)+1}`] = await (await this.cloudinaryService.uploadImage(images[image])).secure_url;
    }
    const currentCategory = updateProductDto.category_id ?? null;
    const lastCategory = (await this.productsService.findOne(+id)).category_id.id;
    if(lastCategory != currentCategory){
      const products = await this.productsService.findAllWithRemoves({category_id: updateProductDto.category_id});
      const consecutive = products.length > 0 ? parseInt(products[products.length - 1].code.substring(updateProductDto.category_id.toString().length)) + 1 : 1;
      updateProductDto.code = `${ updateProductDto.category_id }${ consecutive }`;
    }
    return await this.productsService.update(+id, updateProductDto)
      ? 'se actualizo el producto correctamente' 
      : 'se presento un error al actualizar un producto';
  }

  @Post(':id')
  @UseInterceptors(
    FilesInterceptor('images')
  )
  async updateJava(@UploadedFiles() images: Express.Multer.File, @Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    for(let image in images){
      updateProductDto[`img_${parseInt(image)+1}`] = await (await this.cloudinaryService.uploadImage(images[image])).secure_url;
    }
    const currentCategory = updateProductDto.category_id ?? null;
    const lastCategory = (await this.productsService.findOne(+id)).category_id.id;
    if(currentCategory != null && lastCategory != currentCategory){
      const products = await this.productsService.findAllWithRemoves({category_id: updateProductDto.category_id});
      const consecutive = products.length > 0 ? parseInt(products[products.length - 1].code.substring(updateProductDto.category_id.toString().length)) + 1 : 1;
      updateProductDto.code = `${ updateProductDto.category_id }${ consecutive }`;
    }
    return await this.productsService.update(+id, updateProductDto)
      ? 'se actualizo el producto correctamente'
      : 'se presento un error al actualizar un producto';
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(+id)
      ? { message: 'se elimino el producto correctamente' }
      : { message: 'se presento un error al eliminar un producto' };
  }
}
