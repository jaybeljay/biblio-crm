import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/infra/database/schemas/admin.schema';
import { BcryptModule } from '../third-parties/bcrypt';
import { AdminController } from './features/crud-admin/admin.controller';
import { AdminService } from './features/crud-admin/admin.service';
import { AuthAdminController } from './features/auth/auth.admin-controller';
import { AuthAdminService } from './features/auth/auth.admin-service';
import { JwtModule } from '../third-parties/jwt/jwt.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
    BcryptModule,
    JwtModule,
  ],
  controllers: [AdminController, AuthAdminController],
  providers: [AdminService, AuthAdminService],
})
export class AdminModule {}
