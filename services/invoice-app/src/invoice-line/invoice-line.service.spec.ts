import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceLineService } from './invoice-line.service';

describe('InvoiceLineService', () => {
  let service: InvoiceLineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceLineService],
    }).compile();

    service = module.get<InvoiceLineService>(InvoiceLineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
