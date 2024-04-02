import { ObjectType, Field, Int, ID, Float, Directive } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@ObjectType()
@Directive('@extends')
@Directive(`@key(fields: "track_id")`)
export class Track {
  @Field(() => ID)
  @Directive('@external')
  track_id: number;
}

@ObjectType()
@Table({
  tableName: 'invoice_line',
  timestamps: false
})
export class InvoiceLine extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID, { description: 'Invoice Line ID' })
  invoice_line_id: number;

  @Column
  @Field(() => Int, { description: 'Invoice ID' })
  invoice_id: number;

  @Column
  @Field(() => Int, { description: 'Track ID' })
  track_id: number;

  @Column
  @Field(() => Float, { description: 'Unit Price' })
  unit_price: number;

  @Column
  @Field(() => Int, { description: 'Quantity' })
  quantity: number;

  @Field(() => Track)
  track: Track
}