import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminDocument } from 'src/infra/database/schemas/admin.schema';
import { CreateAdminFeatureDto } from './dto/create/create-admin.feature.dto';
import { AdminResponseDto } from './dto/admin.response.dto';
import { ExceptionTypes } from 'src/modules/common/types/exceptions';
import { BcryptService } from 'src/modules/third-parties/bcrypt';
import { UpdateAdminFeatureDto } from './dto/update/update-admin.feature.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private adminModel: Model<AdminDocument>,
    private readonly bcryptService: BcryptService,
  ) {}

  async create(dto: CreateAdminFeatureDto): Promise<AdminResponseDto> {
    try {
      const emailExists = await this.adminModel.exists({ email: dto.email });

      if (emailExists) {
        throw new ConflictException(ExceptionTypes.EMAIL_ALREADY_EXISTS);
      }

      const hashedPassword = await this.bcryptService.hash(dto.password);

      const newAdmin = new this.adminModel({
        ...dto,
        password: hashedPassword,
      });

      const admin = await newAdmin.save();

      return new AdminResponseDto(admin);
    } catch (e) {
      throw e;
    }
  }

  async update(
    adminId: string,
    dto: UpdateAdminFeatureDto,
  ): Promise<AdminResponseDto> {
    const admin = await this.adminModel.findByIdAndUpdate(adminId, dto, {
      new: true,
    });

    if (!admin) {
      throw new NotFoundException(`Admin #${adminId} not found`);
    }
    return new AdminResponseDto(admin);
  }

  async findAll(): Promise<AdminResponseDto[]> {
    const admins = await this.adminModel.find();

    if (!admins.length) {
      throw new NotFoundException('Admins not found');
    }

    return admins.map((admin) => new AdminResponseDto(admin));
  }

  async findOne(adminId: string): Promise<AdminResponseDto> {
    const admin = await this.adminModel.findById(adminId).exec();

    if (!admin) {
      throw new NotFoundException(`Admin #${adminId} not found`);
    }

    return new AdminResponseDto(admin);
  }

  async delete(adminId: string): Promise<void> {
    const admin = await this.adminModel.findByIdAndDelete(adminId);

    if (!admin) {
      throw new NotFoundException(`Admin #${adminId} not found`);
    }

    return;
  }
}
