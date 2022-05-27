import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { Provider } from './entities/provider.entity';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
  ) { }
  async create(createProviderDto: CreateProviderDto): Promise<boolean> {
    const res = await this.providerRepository.insert(createProviderDto);
    return res ? true : false;
  }

  async findAll(): Promise<Provider[]> {
    return await this.providerRepository.find({ where: { remove: false } });
  }

  async findOne(id: number): Promise<Provider> {
    return await this.providerRepository.findOne({ where: { id, remove: false } });
  }

  async update(id: number, updateProviderDto: UpdateProviderDto) {
    return await this.providerRepository.update(id, updateProviderDto);
  }

  async remove(id: number): Promise<boolean> {
    return await this.providerRepository.update(id, { remove: true }) ? true : false;
  }
}
