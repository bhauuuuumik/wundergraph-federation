import { CreateMediaTypeInput } from './create-media-type.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateMediaTypeInput extends PartialType(CreateMediaTypeInput) {
  @Field(() => ID, { description: 'MediaType ID' })
  media_type_id: number;

  @Field(() => String, { description: 'MediaType Name' })
  name: string;
}
