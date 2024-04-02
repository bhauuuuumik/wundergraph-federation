import { Injectable } from '@nestjs/common';
import { CreateAlbumInput } from './dto/create-album.input';
import { UpdateAlbumInput } from './dto/update-album.input';
import { InjectModel } from '@nestjs/sequelize';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumsService {

  constructor(@InjectModel(Album) private albumModel: typeof Album) { }

  create(createAlbumInput: CreateAlbumInput) {
    const { title, artist_id } = createAlbumInput;
    return this.albumModel.create({ title, artist_id });
  }

  findAll() {
    return this.albumModel.findAll();
  }

  findOne(album_id: number) {
    return this.albumModel.findOne({
      where: {
        album_id
      }
    });
  }

  async update(album_id: number, updateAlbumInput: UpdateAlbumInput) {
    const { title, artist_id } = updateAlbumInput;
    const [affectedCount] = await this.albumModel.update(
      {
        title,
        artist_id
      },
      {
        where: {
          album_id
        }
      });

    if (affectedCount > 0) {
      return this.findOne(album_id);
    }
  }

  remove(album_id: number) {
    return this.albumModel.destroy({
      where: {
        album_id
      }
    });
  }
}
