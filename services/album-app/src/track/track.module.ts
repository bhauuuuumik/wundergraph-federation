import { Module, forwardRef } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackResolver } from './track.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Track } from './entities/track.entity';
import { AlbumsModule } from 'src/albums/albums.module';
import { GenreModule } from 'src/genre/genre.module';
import { MediaTypeModule } from 'src/media-type/media-type.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Track]), 
    forwardRef(() => AlbumsModule),
    GenreModule,
    MediaTypeModule
  ],
  providers: [TrackResolver, TrackService],
  exports: [TrackService]
})
export class TrackModule { }
