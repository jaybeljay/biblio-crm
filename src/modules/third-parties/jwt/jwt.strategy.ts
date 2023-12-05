import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { JwtAudience, JwtPayload, JwtTokenType } from './jwt.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from 'src/infra/database/module/schemas/admin.schema';
import { AdminDocument } from 'src/infra/database/module/documents/admin.document';
import { ConnectionName } from 'src/infra/database/connections';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    @InjectModel(Admin.name, ConnectionName.BASE) private adminModel: Model<AdminDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: JwtPayload): Promise<AdminDocument> {
    switch (payload.tokenType) {
      case JwtTokenType.ADMIN: {
        if (payload.aud !== JwtAudience.ADMIN) {
          throw new UnauthorizedException();
        }

        const admin = await this.adminModel.findOne({
          _id: payload.sub,
          isSuperAdmin: false,
        });

        if (!admin) {
          throw new UnauthorizedException();
        }

        return admin;
      }
      case JwtTokenType.SUPER_ADMIN: {
        if (payload.aud !== JwtAudience.SUPER_ADMIN) {
          throw new UnauthorizedException();
        }

        const superAdmin = await this.adminModel.findOne({
          _id: payload.sub,
          isSuperAdmin: true,
        });

        if (!superAdmin) {
          throw new UnauthorizedException();
        }

        return superAdmin;
      }
    }
  }
}
