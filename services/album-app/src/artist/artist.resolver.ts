import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';

@Resolver(() => Artist)
export class ArtistResolver {
  constructor(private readonly artistService: ArtistService) {}

  @Mutation(() => Artist)
  createArtist(@Args('createArtistInput') createArtistInput: CreateArtistInput) {
    return this.artistService.create(createArtistInput);
  }

  @Query(() => [Artist], { name: 'artists' })
  findAll() {
    return this.artistService.findAll();
  }

  @Query(() => Artist, { name: 'artist' })
  findOne(@Args('artist_id', { type: () => Int }) artist_id: number) {
    return this.artistService.findOne(artist_id);
  }

  @Mutation(() => Artist)
  updateArtist(@Args('updateArtistInput') updateArtistInput: UpdateArtistInput) {
    return this.artistService.update(updateArtistInput.artist_id, updateArtistInput);
  }

  @Mutation(() => Artist)
  removeArtist(@Args('artist_id', { type: () => Int }) artist_id: number) {
    return this.artistService.remove(artist_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; artist_id: number }) {
      return this.artistService.findOne(reference.artist_id);
  }
}
