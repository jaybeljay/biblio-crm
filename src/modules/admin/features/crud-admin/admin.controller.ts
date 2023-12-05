import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AdminPanelAdminController } from '../../common/decorators/decorators';
import { AdminService } from './admin.service';
import { CreateAdminRequestDto } from './dto/create/create-admin.request.dto';
import { AdminResponseDto } from './dto/admin.response.dto';
import { UpdateAdminRequestDto } from './dto/update/update-admin.request.dto';
import { ParseObjectIdPipe } from 'src/modules/common/validation/object-id.pipe';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AdminRole } from '../../common/types';
import { JwtAuthGuard } from 'src/modules/common/guards/auth-jwt.guard';

@AdminPanelAdminController()
@UseGuards(JwtAuthGuard, AdminGuard(AdminRole.SUPER_ADMIN))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(
    @Body() dto: CreateAdminRequestDto,
  ): Promise<AdminResponseDto> {
    return this.adminService.create(dto);
  }

  @Patch(':id')
  async updateAdmin(
    @Param('id', ParseObjectIdPipe) adminId: string,
    @Body() dto: UpdateAdminRequestDto,
  ): Promise<AdminResponseDto> {
    return this.adminService.update(adminId, dto);
  }

  @Get()
  async getAdmins(): Promise<AdminResponseDto[]> {
    return this.adminService.findAll();
  }

  @Get(':id')
  async getAdmin(
    @Param('id', ParseObjectIdPipe) adminId: string,
  ): Promise<AdminResponseDto> {
    return this.adminService.findOne(adminId);
  }

  @Delete(':id')
  async deleteAdmin(
    @Param('id', ParseObjectIdPipe) adminId: string,
  ): Promise<void> {
    return this.adminService.delete(adminId);
  }
}
