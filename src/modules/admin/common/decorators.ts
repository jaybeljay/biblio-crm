import { Controller, applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export const AdminPanelAdminController = (): ClassDecorator =>
  applyDecorators(
    Controller('admin-panel/admins'),
    ApiTags('Admin-Panel/Admin'),
  );
