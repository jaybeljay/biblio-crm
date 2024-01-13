import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdminFeatureDto } from './dto/create/create-admin.feature.dto';
import { AdminResponseDto } from './dto/admin.response.dto';
import { ExceptionTypes } from 'src/modules/common/types/exceptions';
import { BcryptService } from 'src/modules/third-parties/bcrypt';
import { UpdateAdminFeatureDto } from './dto/update/update-admin.feature.dto';
import { UnitOfWork } from 'src/infra/database/module/unit-of-work/unit-of-work';

@Injectable()
export class AdminService {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(dto: CreateAdminFeatureDto): Promise<AdminResponseDto> {
    try {
      const sessionId = await this.uow.startSession();
      return this.uow.runInTransaction(sessionId, async () => {
        const adminRepository = this.uow.getAdminRepository(sessionId);

        const emailExists = await adminRepository.exists({ email: dto.email });

        if (emailExists) {
          throw new ConflictException(ExceptionTypes.EMAIL_ALREADY_EXISTS);
        }

        const hashedPassword = await this.bcryptService.hash(dto.password);

        const admin = await adminRepository.create({
          ...dto,
          password: hashedPassword,
          isSuperAdmin: false,
        });

        return new AdminResponseDto(admin);
      });
    } catch (e) {
      throw e;
    }
  }

  async update(
    adminId: string,
    dto: UpdateAdminFeatureDto,
  ): Promise<AdminResponseDto> {
    const sessionId = await this.uow.startSession();
    return this.uow.runInTransaction(sessionId, async () => {
      const adminRepository = this.uow.getAdminRepository(sessionId);

      const admin = await adminRepository.findOneAndUpdate(
        { _id: adminId },
        dto,
      );

      if (!admin) {
        throw new NotFoundException(ExceptionTypes.USER_NOT_FOUND);
      }

      return new AdminResponseDto(admin);
    });
  }

  async findAll(): Promise<AdminResponseDto[]> {
    const sessionId = await this.uow.startSession();
    return this.uow.runInTransaction(sessionId, async () => {
      const adminRepository = this.uow.getAdminRepository(sessionId);

      const admins = await adminRepository.findAll();

      if (!admins.length) {
        return [];
      }

      return admins.map((admin) => new AdminResponseDto(admin));
    });
  }

  async findOne(adminId: string): Promise<AdminResponseDto> {
    const sessionId = await this.uow.startSession();
    return this.uow.runInTransaction(sessionId, async () => {
      const adminRepository = this.uow.getAdminRepository(sessionId);

      const admin = await adminRepository.findOne({ _id: adminId });

      if (!admin) {
        throw new NotFoundException(ExceptionTypes.USER_NOT_FOUND);
      }

      return new AdminResponseDto(admin);
    });
  }

  async delete(adminId: string): Promise<void> {
    const sessionId = await this.uow.startSession();
    return this.uow.runInTransaction(sessionId, async () => {
      const adminRepository = this.uow.getAdminRepository(sessionId);

      const admin = await adminRepository.findByIdAndDelete(adminId);

      if (!admin) {
        throw new NotFoundException(ExceptionTypes.USER_NOT_FOUND);
      }

      return;
    });
  }
}
