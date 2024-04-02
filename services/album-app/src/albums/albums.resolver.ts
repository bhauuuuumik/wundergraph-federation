import { Resolver, Query, Mutation, Args, Int, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { AlbumsService } from './albums.service';
import { Album } from './entities/album.entity';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { Track } from 'src/track/entities/track.entity';
import { TrackService } from 'src/track/track.service';
import { Artist } from 'src/artist/entities/artist.entity';
import { ArtistService } from 'src/artist/artist.service';

@Resolver(() => Album)
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TrackService,
    private readonly artistService: ArtistService,
  ) { }

  @Mutation(() => Album)
  createAlbum(@Args('createAlbumInput') createAlbumInput: CreateAlbumInput) {
    return this.albumsService.create(createAlbumInput);
  }

  @Query(() => [Album], { name: 'albums' })
  findAll() {
    return this.albumsService.findAll();
  }

  @Query(() => Album, { name: 'album' })
  findOne(@Args('album_id', { type: () => Int }) album_id: number) {
    return this.albumsService.findOne(album_id);
  }

  @Mutation(() => Album)
  updateAlbum(@Args('updateAlbumInput') updateAlbumInput: UpdateAlbumInput) {
    return this.albumsService.update(updateAlbumInput.album_id, updateAlbumInput);
  }

  @Mutation(() => Album)
  removeAlbum(@Args('album_id', { type: () => Int }) album_id: number) {
    return this.albumsService.remove(album_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; album_id: number }) {
    return this.albumsService.findOne(reference.album_id);
  }

  @ResolveField('tracks', () => [Track])
  async getTracks(@Parent() album: Album) {
    const { album_id } = album;
    return this.tracksService.findAllTracksByAlbumId(album_id);
  }

  @ResolveField('artist', () => Artist)
  async getArtist(@Parent() album: Album) {
    const { artist_id } = album;
    return this.artistService.findOne(artist_id);
  }
}
