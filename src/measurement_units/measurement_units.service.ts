import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMeasurementUnitDto } from './dto/create-measurement_unit.dto';
import { UpdateMeasurementUnitDto } from './dto/update-measurement_unit.dto';
import { MeasurementUnit } from './entities/measurement_unit.entity';

@Injectable()
export class MeasurementUnitsService {

  constructor(
    @InjectRepository(MeasurementUnit)
    private readonly measurementUnitRepository: Repository<MeasurementUnit>
  ){}

  async create(createMeasurementUnitDto: CreateMeasurementUnitDto) {
    return await this.measurementUnitRepository.create(createMeasurementUnitDto);
  }

  async findAll(): Promise<MeasurementUnit[]> {
    return await this.measurementUnitRepository.find();
  }

  async findOne(id: number): Promise<MeasurementUnit> {
    return await this.measurementUnitRepository.findOne(id);
  }

  async update(id: number, updateMeasurementUnitDto: UpdateMeasurementUnitDto) {
    return await this.measurementUnitRepository.update(id, updateMeasurementUnitDto);
  }

  async remove(id: number) {
    return await this.measurementUnitRepository.delete(id);
  }
}
