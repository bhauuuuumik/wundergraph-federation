import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';

@ObjectType()
@Directive(`@key(fields: "artist_id")`)
@Table({
    tableName: 'artist',
    timestamps: false
})
export class Artist extends Model {
  
  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID)
  artist_id!: number;

  @Column
  @Field()
  name!: string;
}
