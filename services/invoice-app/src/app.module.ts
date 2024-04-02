import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './invoice/invoice.module';
import { InvoiceLineModule } from './invoice-line/invoice-line.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { Invoice } from './invoice/entities/invoice.entity';
import { InvoiceLine } from './invoice-line/entities/invoice-line.entity';
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
      models: [Invoice, InvoiceLine]
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      path: '/invoices',
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql')
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    }),
    InvoiceModule, 
    InvoiceLineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
