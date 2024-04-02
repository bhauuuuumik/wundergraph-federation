import { CreateInvoiceLineInput } from './create-invoice-line.input';
import { InputType, Field, Int, PartialType, ID, Float } from '@nestjs/graphql';

@InputType()
export class UpdateInvoiceLineInput extends PartialType(CreateInvoiceLineInput) {
  @Field(() => ID, { description: 'Invoice Line ID' })
  invoice_line_id: number;

  @Field(() => Float, { description: 'Unit Price' })
  unit_price: number;

  @Field(() => Int, { description: 'Quantity' })
  quantity: number;
}
