import { Test, TestingModule } from '@nestjs/testing';
import { GsmdataService } from './gsmdata.service';

describe('GsmdataService', () => {
  let service: GsmdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GsmdataService],
    }).compile();

    service = module.get<GsmdataService>(GsmdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
