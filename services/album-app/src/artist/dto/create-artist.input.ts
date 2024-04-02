import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateArtistInput {
  @Field(() => String, { description: 'Artist Name' })
  name: string;
}
