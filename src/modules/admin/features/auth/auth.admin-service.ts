import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminSignInFeatureDto } from './dtos/admin-sign-in.feature.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from 'src/infra/database/schemas/admin.schema';
import { BcryptService } from 'src/modules/third-parties/bcrypt';
import { JwtService } from 'src/modules/third-parties/jwt/jwt.service';
import { ExceptionTypes } from 'src/modules/common/types/exceptions';
import { AdminSignInResponseDto } from './dtos/admin-sign-in.response.dto';
import { AdminPreviewResponseDto } from './dtos/admin-preview.response.dto';

@Injectable()
export class AuthAdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async signIn(dto: AdminSignInFeatureDto): Promise<AdminSignInResponseDto> {
    const { email, password } = dto;

    const admin = await this.adminModel.findOne({
      email,
    });

    if (!admin) {
      throw new UnauthorizedException(ExceptionTypes.INVALID_EMAIL_OR_PASSWORD);
    }

    const isPasswordMatch = await this.bcryptService.compare(
      password,
      admin.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException(ExceptionTypes.INVALID_EMAIL_OR_PASSWORD);
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
  }

  async findById(adminId: string): Promise<AdminPreviewResponseDto> {
    const admin = await this.adminModel.findOne({
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
  }
}
