import { Test, TestingModule } from '@nestjs/testing';
import { MediaTypeResolver } from './media-type.resolver';
import { MediaTypeService } from './media-type.service';

describe('MediaTypeResolver', () => {
  let resolver: MediaTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediaTypeResolver, MediaTypeService],
    }).compile();

    resolver = module.get<MediaTypeResolver>(MediaTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
