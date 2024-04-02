import { Injectable } from '@nestjs/common';
import { CreateGenreInput } from './dto/create-genre.input';
import { UpdateGenreInput } from './dto/update-genre.input';
import { InjectModel } from '@nestjs/sequelize';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {

  constructor(@InjectModel(Genre) private genreModel: typeof Genre) { }

  create(createGenreInput: CreateGenreInput) {
    const { name } = createGenreInput;
    return this.genreModel.create({ name });
  }

  findAll() {
    return this.genreModel.findAll();
  }

  findOne(genre_id: number) {
    return this.genreModel.findOne({
      where: {
        genre_id
      }
    });
  }

  async update(genre_id: number, updateGenreInput: UpdateGenreInput) {
    const {name} = updateGenreInput;
    const [affectedCount] = await this.genreModel.update({
      name
    }, {
      where: {
        genre_id
      }
    });

    if(affectedCount > 0) {
      return this.findOne(genre_id);
    }
  }

  remove(genre_id: number) {
    return this.genreModel.destroy({
      where: {
        genre_id
      }
    });
  }
}
