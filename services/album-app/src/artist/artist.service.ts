import { Injectable } from '@nestjs/common';
import { CreateArtistInput } from './dto/create-artist.input';
import { UpdateArtistInput } from './dto/update-artist.input';
import { InjectModel } from '@nestjs/sequelize';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(@InjectModel(Artist) private artistModel: typeof Artist) { }

  create(createArtistInput: CreateArtistInput) {
    const { name } = createArtistInput;
    return this.artistModel.create({ name });
  }

  findAll() {
    return this.artistModel.findAll();
  }

  findOne(artist_id: number) {
    return this.artistModel.findOne({
      where: {
        artist_id
      }
    });
  }

  async update(artist_id: number, updateArtistInput: UpdateArtistInput) {
    const { name } = updateArtistInput
    const [affectedCount] = await this.artistModel.update({
      name
    },
    {
      where: {
        artist_id
      }
    });

    if(affectedCount > 0) {
      return this.findOne(artist_id);
    }
  }

  remove(artist_id: number) {
    return this.artistModel.destroy({
      where: {
        artist_id
      }
    })
  }
}
