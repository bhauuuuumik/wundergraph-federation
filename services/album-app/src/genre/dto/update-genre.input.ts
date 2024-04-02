import { CreateGenreInput } from './create-genre.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateGenreInput extends PartialType(CreateGenreInput) {
  @Field(() => ID, { description: 'Genre ID' })
  genre_id: number;

  @Field(() => String, { description: 'Genre Name' })
  name: string;
}
