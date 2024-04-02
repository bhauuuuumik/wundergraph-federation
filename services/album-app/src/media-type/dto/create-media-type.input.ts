import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateMediaTypeInput {
  @Field(() => String, { description: 'MediaType Name' })
  name: string;
}
