import { Test, TestingModule } from '@nestjs/testing';
import { InvoiceLineResolver } from './invoice-line.resolver';
import { InvoiceLineService } from './invoice-line.service';

describe('InvoiceLineResolver', () => {
  let resolver: InvoiceLineResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvoiceLineResolver, InvoiceLineService],
    }).compile();

    resolver = module.get<InvoiceLineResolver>(InvoiceLineResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
