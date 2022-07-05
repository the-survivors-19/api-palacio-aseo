import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from 'src/categories/categories.service';
import { ProvidersService } from 'src/providers/providers.service';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoriesService: CategoriesService,
    private readonly providersService: ProvidersService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<boolean> {
    const category = await this.categoriesService.findOne(
      createProductDto.category_id,
    );
    const provider = await this.providersService.findOne(
      createProductDto.provider_id,
    );
    const { category_id, provider_id, ...data } = createProductDto;
    const product = this.productRepository.create(data);
    product.category_id = category;
    product.provider_id = provider;
    return (await this.productRepository.save(product)) ? true : false;
  }

  async findAll(params?: object) {
    return await this.productRepository.find({
      where: {
        ...params,
        remove: false
      },
      order: {
        code: 'ASC'
      },
      relations: ['category_id', 'provider_id'],
    });
  }

  async findAllWithRemoves(params?: object) {
    return await this.productRepository.find({
      where: {
        ...params,
      },
      order: {
        code: 'ASC'
      },
      relations: ['category_id', 'provider_id'],
    });
  }

  async findOne(id: number) {
    return await this.productRepository.findOne(id, {
      relations: ['category_id', 'provider_id'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { category_id, provider_id, ...data } = updateProductDto;
    const product = this.productRepository.create(data);
    if (category_id) {
      product.category_id = await this.categoriesService.findOne(
        updateProductDto.category_id,
      );
    }
    if (provider_id) {
      product.provider_id = await this.providersService.findOne(
        updateProductDto.provider_id,
      );
    }
    return (await this.productRepository.update(id, product)) ? true : false;
  }

  async remove(id: number) {
    return (await this.productRepository.update(id, {remove: true})) ? true : false;
  }
}
