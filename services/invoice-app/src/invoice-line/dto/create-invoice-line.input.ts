import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceLineInput {

  @Field(() => Int, { description: 'Invoice ID' })
  invoice_id: number;

  @Field(() => Int, { description: 'Track ID' })
  track_id: number;

  @Field(() => Float, { description: 'Unit Price' })
  unit_price: number;

  @Field(() => Int, { description: 'Quantity' })
  quantity: number;
}
