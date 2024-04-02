import { ObjectType, Field, Int, Directive, ID } from '@nestjs/graphql';
import { AutoIncrement, Column, Model, PrimaryKey, Table } from 'sequelize-typescript';
import { Artist } from 'src/artist/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';

@ObjectType()
@Directive(`@key(fields: "album_id")`)
@Table({
  tableName: 'album',
  timestamps: false
})
export class Album extends Model {

  @PrimaryKey
  @AutoIncrement
  @Column
  @Field(() => ID)
  album_id!: number;

  @Column
  @Field()
  title!: string;

  @Column
  @Field(() => Int)
  artist_id!: number;

  @Field(() => [Track])
  tracks: [Track]

  @Field(() => Artist)
  artist: Artist
}
