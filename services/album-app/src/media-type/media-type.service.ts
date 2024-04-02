import { Injectable } from '@nestjs/common';
import { CreateMediaTypeInput } from './dto/create-media-type.input';
import { UpdateMediaTypeInput } from './dto/update-media-type.input';
import { InjectModel } from '@nestjs/sequelize';
import { MediaType } from './entities/media-type.entity';

@Injectable()
export class MediaTypeService {
  constructor(@InjectModel(MediaType) private mediaTypeModel: typeof MediaType) { }
  create(createMediaTypeInput: CreateMediaTypeInput) {
    const { name } = createMediaTypeInput;
    return this.mediaTypeModel.create({
      name
    });
  }

  findAll() {
    return this.mediaTypeModel.findAll();
  }

  findOne(media_type_id: number) {
    return this.mediaTypeModel.findOne({
      where: {
        media_type_id
      }
    });
  }

  async update(media_type_id: number, updateMediaTypeInput: UpdateMediaTypeInput) {
    const { name } = updateMediaTypeInput;
    const [affectedCount] = await this.mediaTypeModel.update({
      name
    }, {
      where: {
        media_type_id
      }
    });

    if(affectedCount > 0) {
      return this.findOne(media_type_id);
    }
  }

  remove(media_type_id: number) {
    return this.mediaTypeModel.destroy({
      where: {
        media_type_id
      }
    });
  }
}
