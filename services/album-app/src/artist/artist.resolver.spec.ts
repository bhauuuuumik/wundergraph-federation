import { Test, TestingModule } from '@nestjs/testing';
import { ArtistResolver } from './artist.resolver';
import { ArtistService } from './artist.service';

describe('ArtistResolver', () => {
  let resolver: ArtistResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtistResolver, ArtistService],
    }).compile();

    resolver = module.get<ArtistResolver>(ArtistResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
