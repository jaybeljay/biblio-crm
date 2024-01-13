import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtConfigService } from './jwt-config.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Admin,
  AdminSchema,
} from 'src/infra/database/module/schemas/admin.schema';
import { ConnectionName } from 'src/infra/database/connections';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    NestJwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  ],
  providers: [JwtStrategy, JwtService],
  exports: [PassportModule, JwtStrategy, JwtService],
})
export class JwtModule {}
