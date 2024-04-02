import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTrackInput {
  @Field(() => String, { description: 'Track Name' })
  name: string;

  @Field(() => Int, { description: 'Album ID' })
  album_id: number;

  @Field(() => Int, { description: 'Media Type ID' })
  media_type_id: number;

  @Field(() => Int, { description: 'Genre ID' })
  genre_id: number;

  @Field(() => String, { description: 'Composer' })
  composer: string;

  @Field(() => Int, { description: 'Track Duration in milliseconds' })
  milliseconds: number;

  @Field(() => Int, { description: 'Track Size in bytes' })
  bytes: number;

  @Field(() => Float, { description: 'Track Unit Price' })
  unit_price: number;
}