import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminRole } from '../types';
import { Admin, AdminDocument } from 'src/infra/database/schemas/admin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExceptionTypes } from 'src/modules/common/types/exceptions';

export function AdminGuard(...roles: AdminRole[]): Type<CanActivate> {
  class AdminGuardMixin implements CanActivate {
    constructor(
      @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    ) {
      roles = roles.length ? roles : [AdminRole.ADMIN, AdminRole.SUPER_ADMIN];
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const { user }: { user?: AdminDocument } = context
        .switchToHttp()
        .getRequest();

      if (!user) {
        throw new UnauthorizedException(ExceptionTypes.ACCESS_DENIED);
      }

      const role = await this.getUserRole(user.id);

      if (!roles.includes(role)) {
        throw new ForbiddenException(ExceptionTypes.ACCESS_DENIED);
      }

      return true;
    }

    private async getUserRole(userId: string): Promise<AdminRole> {
      const admin = await this.adminModel.findById(userId);

      if (!admin) {
        throw new ForbiddenException(ExceptionTypes.ACCESS_DENIED);
      }

      if (admin.isActive === false) {
        throw new ForbiddenException(ExceptionTypes.ACCESS_DENIED);
      }

      if (admin.isSuperAdmin) {
        return AdminRole.SUPER_ADMIN;
      }

      return AdminRole.ADMIN;
    }
  }

  return mixin(AdminGuardMixin);
}
