import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Headers
} from '@nestjs/common';
import { RatingsService } from './ratings.service';
import { CreateRatingDto } from './dto/create-rating.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtStrategy } from 'src/auth/strategies';
import { JwtService } from '@nestjs/jwt';

@ApiTags('comments')
@Controller('ratings')
@UseGuards(JwtStrategy)
export class RatingsController {
  constructor(
    private readonly ratingsService: RatingsService,
    private readonly jwtService: JwtService,
  ) {}

  @Post()
  async create(
    @Body() createRatingDto: CreateRatingDto,
    @Headers('authorization') token
  ) {
    const tokenJwt = token.split(' ')[1];
    const dataToken = this.jwtService.decode(tokenJwt);
    const createRating = {
      stars: createRatingDto.stars,
      description: createRatingDto.description,
      product_id: createRatingDto.product_id,
      email_user: dataToken['email']
    }
    return await this.ratingsService.create(createRating);
  }

  @Get()
  findAll() {
    return this.ratingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ratingsService.findOne(+id);
  }
}
