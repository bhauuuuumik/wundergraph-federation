import { CreateArtistInput } from './create-artist.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateArtistInput extends PartialType(CreateArtistInput) {
  @Field(() => Int)
  artist_id: number;

  @Field(() => String)
  name: string;
}
