import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { AdminRepository } from './repositories/admin.repository';
import { UnitOfWork } from './unit-of-work/unit-of-work';
import { repositories } from './repositories';
import { ConnectionName } from '../connections';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }], ConnectionName.BASE),
  ],
  providers: [...repositories, UnitOfWork],
  exports: [UnitOfWork],
})
export class DatabaseModule {}
