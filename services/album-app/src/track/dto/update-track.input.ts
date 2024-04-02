import { CreateTrackInput } from './create-track.input';
import { InputType, Field, Int, PartialType, Float, ID } from '@nestjs/graphql';

@InputType()
export class UpdateTrackInput extends PartialType(CreateTrackInput) {

  @Field(() => ID, { description: 'Track Name' })
  track_id: number;

  @Field(() => String, { description: 'Track Name' })
  name: string;

  @Field(() => String, { description: 'Composer' })
  composer: string;

  @Field(() => Int, { description: 'Track Duration in milliseconds' })
  milliseconds: number;

  @Field(() => Int, { description: 'Track Size in bytes' })
  bytes: number;

  @Field(() => Float, { description: 'Track Unit Price' })
  unit_price: number;
}
