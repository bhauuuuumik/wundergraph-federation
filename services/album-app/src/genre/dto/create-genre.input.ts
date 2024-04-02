import { InputType, Field, ID } from '@nestjs/graphql';

@InputType()
export class CreateGenreInput {
  @Field(() => String, { description: 'Genre Name' })
  name: string;
}
