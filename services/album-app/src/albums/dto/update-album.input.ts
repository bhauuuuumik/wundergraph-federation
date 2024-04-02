import { CreateAlbumInput } from './create-album.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAlbumInput extends PartialType(CreateAlbumInput) {
  @Field(() => Int)
  album_id: number;

  @Field(() => String)
  title: string;

  @Field(() => Int)
  artist_id: number;
}
