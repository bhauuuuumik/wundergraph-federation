import { Resolver, Query, Mutation, Args, Int, ResolveReference, ResolveField, Parent } from '@nestjs/graphql';
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { Album } from 'src/albums/entities/album.entity';
import { AlbumsService } from 'src/albums/albums.service';
import { GenreService } from 'src/genre/genre.service';
import { MediaTypeService } from 'src/media-type/media-type.service';
import { Genre } from 'src/genre/entities/genre.entity';

@Resolver(() => Track)
export class TrackResolver {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumsService: AlbumsService,
    private readonly genreService: GenreService,
    private readonly mediaTypeService: MediaTypeService
  ) { }

  @Mutation(() => Track)
  createTrack(@Args('createTrackInput') createTrackInput: CreateTrackInput) {
    return this.trackService.create(createTrackInput);
  }

  @Query(() => [Track], { name: 'tracks' })
  findAll() {
    return this.trackService.findAll();
  }

  @Query(() => Track, { name: 'track' })
  findOne(@Args('track_id', { type: () => Int }) track_id: number) {
    return this.trackService.findOne(track_id);
  }

  @Mutation(() => Track)
  updateTrack(@Args('updateTrackInput') updateTrackInput: UpdateTrackInput) {
    return this.trackService.update(updateTrackInput.track_id, updateTrackInput);
  }

  @Mutation(() => Track)
  removeTrack(@Args('track_id', { type: () => Int }) track_id: number) {
    return this.trackService.remove(track_id);
  }
  
  @ResolveReference()
  resolveReference(reference: { __typename: string; track_id: number }) {
      return this.trackService.findOne(reference.track_id);
  }

  @ResolveField('album', () => Album)
  getAlbum(@Parent() track: Track) {
    const { album_id } = track;
    return this.albumsService.findOne(album_id);
  }

  @ResolveField('genre', () => Genre)
  getGenre(@Parent() track: Track) {
    const { genre_id } = track;
    return this.genreService.findOne(genre_id);
  }

  @ResolveField('mediaType', () => Genre)
  getMediaType(@Parent() track: Track) {
    const { media_type_id } = track;
    return this.mediaTypeService.findOne(media_type_id);
  }
}
