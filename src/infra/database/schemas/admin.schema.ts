import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBase } from '../interfaces/base.interface';

export type AdminDocument = HydratedDocument<Admin>;

@Schema()
export class Admin implements IBase {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  middleName: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  isActive: boolean;

  @Prop()
  isSuperAdmin: boolean;

  @Prop()
  createdAt: string;

  @Prop()
  updatedAt: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
