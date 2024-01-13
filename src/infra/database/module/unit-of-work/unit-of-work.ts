import { Injectable } from '@nestjs/common';
import { UnitOfWorkMongoose } from 'src/lib/database/unit-of-work/unit-of-work.mongoose';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class UnitOfWork extends UnitOfWorkMongoose {
  getAdminRepository(sessionId?: string) {
    return new AdminRepository(this, sessionId);
  }
}
