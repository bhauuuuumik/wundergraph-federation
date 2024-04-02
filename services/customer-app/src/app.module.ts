import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer } from './customers/models/customer.model';
import { CustomersModule } from './customers/customers.module';
import { Employee } from './customers/models/employee.model';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CustomersModule,
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
      models: [Customer]
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      path: '/customers',
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql')
      },
      buildSchemaOptions: {
        orphanedTypes: [Employee],
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
