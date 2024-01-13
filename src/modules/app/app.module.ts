import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from '../../config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AdminModule } from '../admin/admin.module';
import { DatabaseModule } from '../../infra/database/module/database.module';
import { ConnectionName } from '../../infra/database/connections';
import { createMongoConfig } from 'src/config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config.configuration],
      validationSchema: config.validationSchema,
      validationOptions: config.validationOptions,
    }),
    MongooseModule.forRootAsync({useFactory: createMongoConfig, inject: [ConfigService]}),
    AdminModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
