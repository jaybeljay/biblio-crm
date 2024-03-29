import { Controller, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

const prefix = 'admin-panel';

export const AdminPanelAuthController = (): ClassDecorator =>
  applyDecorators(Controller(`${prefix}/auth`), ApiTags('Admin-Panel/Auth'));

export const AdminPanelAdminController = (): ClassDecorator =>
  applyDecorators(
    Controller(`${prefix}/admins`),
    ApiTags('Admin-Panel/Admin'),
    ApiBearerAuth(),
  );
