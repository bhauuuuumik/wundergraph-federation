import { ObjectType, Field, Int, ID, Directive, Float } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { InvoiceLine } from 'src/invoice-line/entities/invoice-line.entity';

@ObjectType()
@Directive('@extends')
@Directive(`@key(fields: "customer_id")`)
export class Customer {
  @Field(() => ID)
  @Directive('@external')
  customer_id: number;
}

@ObjectType()
@Directive(`@key(fields: "invoice_id")`)
@Table({
  tableName: 'invoice',
  timestamps: false
})
export class Invoice extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID, { description: 'Invoice ID' })
  invoice_id: number;

  @Column
  @Field(() => Int, { description: 'Customer ID' })
  customer_id: number;

  @Column
  @Field(() => Date, { description: 'Invoice Date' })
  invoice_date: Date;

  @Column
  @Field(() => String, { description: 'Billing Address' })
  billing_address: string;

  @Column
  @Field(() => String, { description: 'Billing City' })
  billing_city: string;

  @Column
  @Field(() => String, { description: 'Billing State' })
  billing_state: string;

  @Column
  @Field(() => String, { description: 'Billing City' })
  billing_country: string;

  @Column
  @Field(() => String, { description: 'Billing City' })
  billing_postal_code: string;

  @Column
  @Field(() => Float, { description: 'Invoice Total' })
  total: number;

  @Field(() => [InvoiceLine])
  invoiceLines: [InvoiceLine];

  @Field(() => Customer)
  customer: Customer;
}
