import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Employee } from './employees/models/employee.model';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { EmployeesModule } from './employees/employees.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    EmployeesModule,
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
      models: [Employee]
    }),
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      path: '/employees',
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2,
        path: join(process.cwd(), 'src/schema.gql')
      },
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
