import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@ObjectType()
@Directive(`@key(fields: "media_type_id")`)
@Table({
  tableName: 'media_type',
  timestamps: false
})
export class MediaType extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID, { description: 'MediaType ID' })
  media_type_id: number;

  @Column
  @Field(() => String, { description: 'MediaType Name' })
  name: string;
}
