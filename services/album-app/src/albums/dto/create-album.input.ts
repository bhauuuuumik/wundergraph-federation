import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAlbumInput {
  @Field(() => String, { description: 'Album Title' })
  title: string;

  @Field(() => Int, { description: 'Artist ID'})
  artist_id: number;
}
