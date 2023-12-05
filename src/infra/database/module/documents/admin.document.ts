import { HydratedDocument } from 'mongoose';
import { Admin } from '../schemas/admin.schema';
import { MongooseDocumentBase } from 'src/lib/database/documents/document.mongoose.base';

export type AdminDocument = HydratedDocument<Admin & MongooseDocumentBase>;
