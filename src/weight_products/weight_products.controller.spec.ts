import { Test, TestingModule } from '@nestjs/testing';
import { WeightProductsController } from './weight_products.controller';
import { WeightProductsService } from './weight_products.service';

describe('WeightProductsController', () => {
  let controller: WeightProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightProductsController],
      providers: [WeightProductsService],
    }).compile();

    controller = module.get<WeightProductsController>(WeightProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
