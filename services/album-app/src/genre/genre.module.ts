import { Module } from '@nestjs/common';
import { GenreService } from './genre.service';
import { GenreResolver } from './genre.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './entities/genre.entity';

@Module({
  imports: [SequelizeModule.forFeature([Genre])],
  providers: [GenreResolver, GenreService],
  exports: [GenreService]
})
export class GenreModule {}
