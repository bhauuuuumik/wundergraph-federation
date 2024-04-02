import { ObjectType, Field, Int, Directive, ID, Float } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Album } from 'src/albums/entities/album.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { MediaType } from 'src/media-type/entities/media-type.entity';

@ObjectType()
@Directive(`@key(fields: "track_id")`)
@Table({
  tableName: 'track',
  timestamps: false
})
export class Track extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID, { description: 'Track ID' })
  track_id: number;

  @Column
  @Field(() => String, { description: 'Track Name' })
  name: string;

  @Column
  @Field(() => Int, { description: 'Album ID' })
  album_id: number;

  @Column
  @Field(() => Int, { description: 'Media Type ID' })
  media_type_id: number;

  @Column
  @Field(() => Int, { description: 'Genre ID' })
  genre_id: number;

  @Column
  @Field(() => String, { description: 'Composer', nullable: true })
  composer?: string;

  @Column
  @Field(() => Int, { description: 'Track Duration in milliseconds' })
  milliseconds: number;

  @Column
  @Field(() => Int, { description: 'Track Size in bytes' })
  bytes: number;

  @Column
  @Field(() => Float, { description: 'Track Unit Price' })
  unit_price: number;

  @Field(() => Album, {nullable: false})
  album!: Album;

  @Field(() => Genre, {nullable: false})
  genre!: Genre;

  @Field(() => MediaType, {nullable: false})
  mediaType!: MediaType;
}
