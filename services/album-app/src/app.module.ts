import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumsModule } from './albums/albums.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Album } from './albums/entities/album.entity';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ArtistModule } from './artist/artist.module';
import { Artist } from './artist/entities/artist.entity';
import { TrackModule } from './track/track.module';
import { GenreModule } from './genre/genre.module';
import { Track } from './track/entities/track.entity';
import { Genre } from './genre/entities/genre.entity';
import { MediaTypeModule } from './media-type/media-type.module';
import { MediaType } from './media-type/entities/media-type.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.local.env',
      ignoreEnvFile: process.env.IGNORE_ENV_FILE == 'true' ? true : false,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      models: [Album, Artist, Track, Genre, MediaType]
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      path: '/albums',
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql')
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    AlbumsModule,
    ArtistModule,
    TrackModule,
    GenreModule,
    MediaTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
