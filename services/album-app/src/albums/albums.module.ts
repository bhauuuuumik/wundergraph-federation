import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsResolver } from './albums.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './entities/album.entity';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Album]),
    forwardRef(() => TrackModule),
    ArtistModule
  ],
  providers: [AlbumsResolver, AlbumsService],
  exports: [AlbumsService]
})
export class AlbumsModule { }
