import { Injectable } from '@nestjs/common';
import { JwtService as NestJwtService, JwtVerifyOptions } from '@nestjs/jwt';
import { AdminRole } from 'src/modules/admin/common/types';

export enum JwtTokenType {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export enum JwtAudience {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface JwtPayload {
  sub: string;
  aud: JwtAudience;
  tokenType: JwtTokenType;
}

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: NestJwtService) {}

  async createSuperAdminJwtToken(id: string): Promise<string> {
    const payload = {
      sub: id,
      aud: JwtAudience.SUPER_ADMIN,
      tokenType: JwtTokenType.SUPER_ADMIN,
    };

    return this.jwtService.sign(payload);
  }

  async createAdminJwtToken(id: string): Promise<string> {
    const payload = {
      sub: id,
      aud: JwtAudience.ADMIN,
      tokenType: JwtTokenType.ADMIN,
    };

    return this.jwtService.sign(payload);
  }

  async createUserJwtToken(id: string): Promise<string> {
    const payload = {
      sub: id,
      aud: JwtAudience.USER,
      tokenType: JwtTokenType.USER,
    };

    return this.jwtService.sign(payload);
  }

  async verifyTokenAsync(
    token: string,
    options?: JwtVerifyOptions,
  ): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, options);
  }
}
