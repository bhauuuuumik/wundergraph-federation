import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@ObjectType()
@Directive(`@key(fields: "genre_id")`)
@Table({
  tableName: 'genre',
  timestamps: false
})
export class Genre extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID, { description: 'Genre ID' })
  genre_id: number;

  @Column
  @Field(() => String, { description: 'Genre Name' })
  name: string;
}
