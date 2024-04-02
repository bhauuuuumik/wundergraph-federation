import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';

@Resolver(() => Genre)
export class GenreResolver {
  constructor(private readonly genreService: GenreService) {}

  @Mutation(() => Genre)
  createGenre(@Args('createGenreInput') createGenreInput: CreateGenreInput) {
    return this.genreService.create(createGenreInput);
  }

  @Query(() => [Genre], { name: 'genres' })
  findAll() {
    return this.genreService.findAll();
  }

  @Query(() => Genre, { name: 'genre' })
  findOne(@Args('genre_id', { type: () => Int }) genre_id: number) {
    return this.genreService.findOne(genre_id);
  }

  @Mutation(() => Genre)
  updateGenre(@Args('updateGenreInput') updateGenreInput: UpdateGenreInput) {
    return this.genreService.update(updateGenreInput.genre_id, updateGenreInput);
  }

  @Mutation(() => Genre)
  removeGenre(@Args('genre_id', { type: () => Int }) genre_id: number) {
    return this.genreService.remove(genre_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; genre_id: number }) {
      return this.genreService.findOne(reference.genre_id);
  }
}
