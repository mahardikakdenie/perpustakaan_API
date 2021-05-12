import { Test, TestingModule } from '@nestjs/testing';
import { PinaltyController } from './pinalty.controller';

describe('PinaltyController', () => {
  let controller: PinaltyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PinaltyController],
    }).compile();

    controller = module.get<PinaltyController>(PinaltyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
