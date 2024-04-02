import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistResolver } from './artist.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artist } from './entities/artist.entity';

@Module({
  imports: [SequelizeModule.forFeature([Artist])],
  providers: [ArtistResolver, ArtistService],
  exports: [ArtistService]
})
export class ArtistModule { }
