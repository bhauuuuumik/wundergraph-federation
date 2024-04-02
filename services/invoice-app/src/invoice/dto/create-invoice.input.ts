import { InputType, Int, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateInvoiceInput {

  @Field(() => Int, { description: 'Customer ID' })
  customer_id: number;

  @Field(() => Date, { description: 'Invoice Date' })
  invoice_date: Date;

  @Field(() => String, { description: 'Billing Address' })
  billing_address: string;

  @Field(() => String, { description: 'Billing City' })
  billing_city: string;

  @Field(() => String, { description: 'Billing State' })
  billing_state: string;

  @Field(() => String, { description: 'Billing City' })
  billing_country: string;

  @Field(() => String, { description: 'Billing City' })
  billing_postal_code: string;

  @Field(() => Float, { description: 'Invoice Total' })
  total: number;
}
