import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminRole } from '../types';
import { ExceptionTypes } from 'src/modules/common/types/exceptions';
import { AdminDocument } from 'src/infra/database/module/documents/admin.document';
import { UnitOfWork } from 'src/infra/database/module/unit-of-work/unit-of-work';

export function AdminGuard(...roles: AdminRole[]): Type<CanActivate> {
  class AdminGuardMixin implements CanActivate {
    constructor(
      private readonly uow: UnitOfWork,
    ) {
      roles = roles.length ? roles : [AdminRole.ADMIN, AdminRole.SUPER_ADMIN];
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const sessionId = await this.uow.startSession();
      return this.uow.runInTransaction(sessionId, async () => {
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
      })
    }

    private async getUserRole(userId: string, sessionId?: string): Promise<AdminRole> {
        const adminRepository = this.uow.getAdminRepository(sessionId);
        const admin = await adminRepository.findOne({_id: userId});

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
