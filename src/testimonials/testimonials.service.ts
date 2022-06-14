import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { Testimonial } from './entities/testimonial.entity';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectRepository(Testimonial)
    private readonly testimonialsRepository: Repository<Testimonial>
  ){}
  async create(createTestimonialDto: CreateTestimonialDto) {
    return await this.testimonialsRepository.insert(createTestimonialDto);
  }

  async findAll(): Promise<Testimonial[]> {
    return await this.testimonialsRepository.find();
  }

  async findOne(id: number): Promise<Testimonial> {
    return await this.testimonialsRepository.findOne(id);
  }

  async update(id: number, updateTestimonialDto: UpdateTestimonialDto) {
    return await this.testimonialsRepository.update(id, updateTestimonialDto);
  }

  async remove(id: number) {
    return await this.testimonialsRepository.delete(id);
  }
}
