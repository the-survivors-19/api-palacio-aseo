import { Test, TestingModule } from '@nestjs/testing';
import { SalesDetailsController } from './sales_details.controller';
import { SalesDetailsService } from './sales_details.service';

describe('SalesDetailsController', () => {
  let controller: SalesDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesDetailsController],
      providers: [SalesDetailsService],
    }).compile();

    controller = module.get<SalesDetailsController>(SalesDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
