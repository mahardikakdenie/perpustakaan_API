import { Test, TestingModule } from '@nestjs/testing';
import { PinaltyService } from './pinalty.service';

describe('PinaltyService', () => {
  let service: PinaltyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinaltyService],
    }).compile();

    service = module.get<PinaltyService>(PinaltyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
