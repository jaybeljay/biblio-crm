import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/auth-jwt.guard';

export const Private = () =>
  applyDecorators(ApiBearerAuth(), UseGuards(JwtAuthGuard));
