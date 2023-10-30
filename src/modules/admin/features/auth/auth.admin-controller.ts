import { Body, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdminSignInRequestDto } from './dtos/admin-sign-in.request.dto';
import { AdminPreviewResponseDto } from './dtos/admin-preview.response.dto';
import { AdminSignInResponseDto } from './dtos/admin-sign-in.response.dto';
import { AuthAdminService } from './auth.admin-service';
import { AdminPanelAuthController } from '../../common/decorators/decorators';
import { JwtAuthGuard } from 'src/modules/common/guards/auth-jwt.guard';
import { AdminGuard } from '../../common/guards/admin.guard';
import { AdminRole } from '../../common/types';
import { IAM } from 'src/modules/common/decorators/iam.decorator';

@AdminPanelAuthController()
export class AuthAdminController {
  constructor(private readonly authAdminService: AuthAdminService) {}

  @Post('sign-in')
  @ApiOperation({
    summary: 'Sign in to admin panel',
  })
  async signIn(
    @Body() body: AdminSignInRequestDto,
  ): Promise<AdminSignInResponseDto> {
    const { admin, token } = await this.authAdminService.signIn(body);

    return AdminSignInResponseDto.create({ admin, token });
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Get me',
  })
  @UseGuards(JwtAuthGuard, AdminGuard(AdminRole.SUPER_ADMIN, AdminRole.ADMIN))
  async getMe(@IAM('id') adminId: string): Promise<AdminPreviewResponseDto> {
    const admin = await this.authAdminService.findById(adminId);

    return AdminPreviewResponseDto.create(admin);
  }
}
