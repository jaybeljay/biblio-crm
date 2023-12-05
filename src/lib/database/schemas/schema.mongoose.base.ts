import { Schema } from 'mongoose';
import { IBaseOrmEntity } from '../interfaces/base.interface';

export class MongooseOrmSchemaBase extends Schema implements IBaseOrmEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
