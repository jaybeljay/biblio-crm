import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/infra/database/schemas/admin.schema';
import { BcryptModule } from '../third-parties/bcrypt';
import { AdminController } from './feature/crud-admin/admin.controller';
import { AdminService } from './feature/crud-admin/admin.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    BcryptModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
