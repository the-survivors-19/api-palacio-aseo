import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';

@Injectable()
export class OffersService {

  constructor(
    @InjectRepository(Offer)
    private readonly offersRepository: Repository<Offer>
  ){}

  async create(createOfferDto: CreateOfferDto) {
    return await this.offersRepository.insert(createOfferDto);
  }

  async findAll(): Promise<Offer[]> {
    return await this.offersRepository.find();
  }

  async findOne(id: number): Promise<Offer> {
    return await this.offersRepository.findOneOrFail(id);
  }

  async update(id: number, updateOfferDto: UpdateOfferDto) {
    return await this.offersRepository.update(id, updateOfferDto);
  }

  async remove(id: number) {
    return await this.offersRepository.delete(id);
  }
}
