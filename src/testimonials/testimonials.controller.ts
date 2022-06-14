import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('testimonials')
@Controller('api/testimonials')
export class TestimonialsController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly testimonialsService: TestimonialsService,
    private readonly userService: UsersService,
  ) {}

  @Post()
  async create(
    @Body() createTestimonialDto: CreateTestimonialDto,
    @Headers('authorization') token,
  ) {
    const tokenJwt = token.split(' ')[1];
    const dataToken = this.jwtService.decode(tokenJwt);
    const { id: user_id } = await this.userService.findEmail(dataToken["email"]);
    const createTestimonial = {
      user_id,
      description: createTestimonialDto.description
    }
    return this.testimonialsService.create(createTestimonial);
  }

  @Get()
  async findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestimonialDto: UpdateTestimonialDto,
  ) {
    return this.testimonialsService.update(+id, updateTestimonialDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.testimonialsService.remove(+id);
  }
}
