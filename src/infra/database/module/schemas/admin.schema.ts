import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IBaseOrmEntity } from 'src/lib/database/interfaces/base.interface';

@Schema()
export class Admin implements IBaseOrmEntity {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  middleName?: string;

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
