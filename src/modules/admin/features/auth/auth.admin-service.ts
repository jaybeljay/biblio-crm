import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminSignInFeatureDto } from './dtos/admin-sign-in.feature.dto';
import { BcryptService } from 'src/modules/third-parties/bcrypt';
import { JwtService } from 'src/modules/third-parties/jwt/jwt.service';
import { ExceptionTypes } from 'src/modules/common/types/exceptions';
import { AdminSignInResponseDto } from './dtos/admin-sign-in.response.dto';
import { AdminPreviewResponseDto } from './dtos/admin-preview.response.dto';
import { UnitOfWork } from 'src/infra/database/module/unit-of-work/unit-of-work';

@Injectable()
export class AuthAdminService {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async signIn(dto: AdminSignInFeatureDto): Promise<AdminSignInResponseDto> {
    const sessionId = await this.uow.startSession();
    return this.uow.runInTransaction(sessionId, async () => {
      const adminRepository = this.uow.getAdminRepository(sessionId);

      const { email, password } = dto;

      const admin = await adminRepository.findOne({
        email,
      });

      if (!admin) {
        throw new UnauthorizedException(
          ExceptionTypes.INVALID_EMAIL_OR_PASSWORD,
        );
      }

      const isPasswordMatch = await this.bcryptService.compare(
        password,
        admin.password,
      );

      if (!isPasswordMatch) {
        throw new UnauthorizedException(
          ExceptionTypes.INVALID_EMAIL_OR_PASSWORD,
        );
      }

      if (admin.isActive === false) {
        throw new ConflictException(ExceptionTypes.USER_IS_BLOCKED);
      }

      const token = admin.isSuperAdmin
        ? await this.jwtService.createSuperAdminJwtToken(admin.id)
        : await this.jwtService.createAdminJwtToken(admin.id);

      return AdminSignInResponseDto.create({
        admin: {
          id: admin.id,
          email,
          firstName: admin.firstName,
          lastName: admin.lastName,
          middleName: admin.middleName,
          isSuperAdmin: admin.isSuperAdmin,
        },
        token,
      });
    });
  }

  async findById(adminId: string): Promise<AdminPreviewResponseDto> {
    const sessionId = await this.uow.startSession();
    return this.uow.runInTransaction(sessionId, async () => {
      const adminRepository = this.uow.getAdminRepository(sessionId);

      const admin = await adminRepository.findOne({
        _id: adminId,
      });

      if (!admin) {
        throw new NotFoundException(ExceptionTypes.USER_NOT_FOUND);
      }

      return AdminPreviewResponseDto.create({
        id: admin.id,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        middleName: admin.middleName,
      });
    });
  }
}
