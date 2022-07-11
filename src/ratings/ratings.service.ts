import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from 'src/products/products.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateRatingDto } from './dto/create-rating.dto';
import { InsertRatingDto } from './dto/insert-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { Rating } from './entities/rating.entity';

@Injectable()
export class RatingsService {
  constructor(
    @InjectRepository(Rating)
    private readonly ratingRepository: Repository<Rating>,
    private readonly productService: ProductsService,
    private readonly userService: UsersService,
  ){}
  
  async create(insertRatingDto: InsertRatingDto): Promise<boolean> {
    const { product_id, email_user, ...data } = insertRatingDto;
    const user = await this.userService.findEmail(email_user);
    const product = await this.productService.findOne(product_id);
    const rating = await this.ratingRepository.create(data);
    rating.product_id = product;
    rating.user_id = user;
    return (await this.ratingRepository.save(rating)) ? true : false;
  }

  findAll(): Promise<Rating[]> {
    return this.ratingRepository.find({
      relations: ['product_id', 'user_id']
    });
  }

  findOne(id: number): Promise<Rating> {
    return this.ratingRepository.findOne(id, {
      relations: ['product_id', 'user_id']
    })
  }
}
