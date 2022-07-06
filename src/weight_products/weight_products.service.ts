import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MeasurementUnitsService } from 'src/measurement_units/measurement_units.service';
import { ProductsService } from 'src/products/products.service';
import { Repository } from 'typeorm';
import { CreateWeightProductDto } from './dto/create-weight_product.dto';
import { UpdateWeightProductDto } from './dto/update-weight_product.dto';
import { WeightProduct } from './entities/weight_product.entity';

@Injectable()
export class WeightProductsService {
  constructor(
    @InjectRepository(WeightProduct)
    private readonly weightProductsRepository: Repository<WeightProduct>,
    private readonly productService: ProductsService,
    private readonly measurementUnitService: MeasurementUnitsService,
  ) {}
  async create(createWeightProductDto: CreateWeightProductDto) {
    const product = await this.productService.findOne(
      createWeightProductDto.product_id,
    );
    const measurementUnit = await this.measurementUnitService.findOne(
      createWeightProductDto.measurement_unit_id,
    );
    const { product_id, measurement_unit_id, ...data } = createWeightProductDto;
    const weightProduct = this.weightProductsRepository.create(data);
    weightProduct.product_id = product.id;
    weightProduct.measurement_unit_id = measurementUnit.id;
    return (await this.weightProductsRepository.save(weightProduct))
      ? true
      : false;
  }

  async findAll(): Promise<WeightProduct[]> {
    return await this.weightProductsRepository.find({
      where: { remove: false },
      relations: ['measurement_unit_id']
    });
  }

  async findOne(id: number): Promise<WeightProduct> {
    return await this.weightProductsRepository.findOne(id);
  }

  async update(id: number, updateWeightProductDto: UpdateWeightProductDto) {
    const { measurement_unit_id, product_id, ...data } = updateWeightProductDto;
    const weightProduct = this.weightProductsRepository.create(data);
    if (measurement_unit_id) {
      weightProduct.measurement_unit_id =
        await this.measurementUnitService.findOne(measurement_unit_id);
    }
    if (product_id) {
      weightProduct.product_id = await this.productService.findOne(product_id);
    }
    return (await this.weightProductsRepository.update(id, weightProduct))
      ? true
      : false;
  }

  async remove(id: number) {
    return await this.weightProductsRepository.update(id, { remove: true });
  }
}
