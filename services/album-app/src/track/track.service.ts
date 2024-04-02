import { Injectable } from '@nestjs/common';
import { CreateTrackInput } from './dto/create-track.input';
import { UpdateTrackInput } from './dto/update-track.input';
import { InjectModel } from '@nestjs/sequelize';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(@InjectModel(Track) private trackModel: typeof Track) { }

  create(createTrackInput: CreateTrackInput) {
    const { name, album_id, genre_id, media_type_id, composer, milliseconds, bytes, unit_price } = createTrackInput;
    return this.trackModel.create({
      name,
      album_id,
      genre_id,
      media_type_id,
      composer,
      milliseconds,
      bytes,
      unit_price
    });
  }

  findAllTracksByAlbumId(album_id: number) {
    return this.trackModel.findAll({
      where: {
        album_id
      }
    });
  }

  findAll() {
    return this.trackModel.findAll();
  }

  findOne(track_id: number) {
    return this.trackModel.findOne({
      where: {
        track_id
      }
    });
  }

  async update(track_id: number, updateTrackInput: UpdateTrackInput) {
    const { name, composer, milliseconds, bytes, unit_price } = updateTrackInput;
    const [affectedCount] = await this.trackModel.update({
      name,
      composer,
      milliseconds,
      bytes,
      unit_price
    }, {
      where: {
        track_id
      }
    });

    if (affectedCount > 0) {
      return this.findOne(track_id);
    }
  }

  remove(track_id: number) {
    return this.trackModel.destroy({
      where: {
        track_id
      }
    });
  }
}
