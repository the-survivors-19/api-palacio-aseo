import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { Pqrs } from './entities/pqr.entity';

@Injectable()
export class PqrsService {
  constructor(
    @InjectRepository(Pqrs)
    private readonly pqrsRepository: Repository<Pqrs>
  ){}

  async create(createPqrDto: CreatePqrDto) {
    return await this.pqrsRepository.insert(createPqrDto);
  }

  async findAll(): Promise<Pqrs[]> {
    return await this.pqrsRepository.find();
  }

  async findOne(id: number): Promise<Pqrs> {
    return await this.pqrsRepository.findOne(id);
  }

  async update(id: number, updatePqrDto: UpdatePqrDto) {
    return await this.pqrsRepository.update(id, updatePqrDto);
  }

  async remove(id: number) {
    return await this.pqrsRepository.delete(id);
  }
}
