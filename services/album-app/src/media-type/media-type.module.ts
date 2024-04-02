import { Module } from '@nestjs/common';
import { MediaTypeService } from './media-type.service';
import { MediaTypeResolver } from './media-type.resolver';
import { SequelizeModule } from '@nestjs/sequelize';
import { MediaType } from './entities/media-type.entity';

@Module({
  imports: [SequelizeModule.forFeature([MediaType])],
  providers: [MediaTypeResolver, MediaTypeService],
  exports: [MediaTypeService]
})
export class MediaTypeModule { }
