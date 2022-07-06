import { Test, TestingModule } from '@nestjs/testing';
import { WeightProductsService } from './weight_products.service';

describe('WeightProductsService', () => {
  let service: WeightProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightProductsService],
    }).compile();

    service = module.get<WeightProductsService>(WeightProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
