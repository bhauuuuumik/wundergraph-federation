import { Resolver, Query, Mutation, Args, Int, ResolveReference } from '@nestjs/graphql';
import { MediaTypeService } from './media-type.service';
import { MediaType } from './entities/media-type.entity';
import { CreateMediaTypeInput } from './dto/create-media-type.input';
import { UpdateMediaTypeInput } from './dto/update-media-type.input';

@Resolver(() => MediaType)
export class MediaTypeResolver {
  constructor(private readonly mediaTypeService: MediaTypeService) {}

  @Mutation(() => MediaType)
  createMediaType(@Args('createMediaTypeInput') createMediaTypeInput: CreateMediaTypeInput) {
    return this.mediaTypeService.create(createMediaTypeInput);
  }

  @Query(() => [MediaType], { name: 'mediaTypes' })
  findAll() {
    return this.mediaTypeService.findAll();
  }

  @Query(() => MediaType, { name: 'mediaType' })
  findOne(@Args('media_type_id', { type: () => Int }) media_type_id: number) {
    return this.mediaTypeService.findOne(media_type_id);
  }

  @Mutation(() => MediaType)
  updateMediaType(@Args('updateMediaTypeInput') updateMediaTypeInput: UpdateMediaTypeInput) {
    return this.mediaTypeService.update(updateMediaTypeInput.media_type_id, updateMediaTypeInput);
  }

  @Mutation(() => MediaType)
  removeMediaType(@Args('media_type_id', { type: () => Int }) media_type_id: number) {
    return this.mediaTypeService.remove(media_type_id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; media_type_id: number }) {
      return this.mediaTypeService.findOne(reference.media_type_id);
  }

}
