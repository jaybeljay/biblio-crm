import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as config from './config';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
  isGlobal: true,
  load: [config.configuration],
  validationSchema: config.validationSchema,
  validationOptions: config.validationOptions,
}),
MongooseModule.forRoot(`${process.env.MONGODB_URI}`, { dbName: process.env.MONGODB_NAME }),
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
