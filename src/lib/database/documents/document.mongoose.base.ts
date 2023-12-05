import { HydratedDocument } from 'mongoose';
import { MongooseOrmSchemaBase } from '../schemas/schema.mongoose.base';

export type MongooseDocumentBase = HydratedDocument<MongooseOrmSchemaBase>;
