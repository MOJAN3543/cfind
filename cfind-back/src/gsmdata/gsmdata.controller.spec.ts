import { Test, TestingModule } from '@nestjs/testing';
import { GsmdataController } from './gsmdata.controller';
import { GsmdataService } from './gsmdata.service';

describe('GsmdataController', () => {
  let controller: GsmdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GsmdataController],
      providers: [GsmdataService],
    }).compile();

    controller = module.get<GsmdataController>(GsmdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
