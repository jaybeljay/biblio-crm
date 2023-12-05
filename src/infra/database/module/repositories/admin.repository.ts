import { RepositoryMongooseBase } from 'src/lib/database/repository/repository.mongoose.base';
import { AdminDocument } from '../documents/admin.document';
import { UnitOfWork } from '../unit-of-work/unit-of-work';
import { Admin, AdminSchema } from '../schemas/admin.schema';
import { model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { ConnectionName } from '../../connections';

@Injectable()
export class AdminRepository extends RepositoryMongooseBase<
  AdminDocument,
  UnitOfWork
> {
  protected model = model<AdminDocument>(Admin.name, AdminSchema, Admin.name.toLowerCase());
}
