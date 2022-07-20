import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ){}

  async create(createCategoryDto: CreateCategoryDto): Promise<boolean> {
    console.log(createCategoryDto);
    
    return await this.categoryRepository.insert(createCategoryDto) ? true : false;
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      where: {
        remove: false,
      },
      relations: ['products']
    });
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne(id, {
      where: {
        remove: false,
      },
      relations: ['products']
    });
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<boolean> {
    return await this.categoryRepository.update(id, updateCategoryDto) ? true : false;
  }

  async remove(id: number): Promise<boolean> {
    return await this.categoryRepository.update(id, { remove: true }) ? true : false;
  }
}
