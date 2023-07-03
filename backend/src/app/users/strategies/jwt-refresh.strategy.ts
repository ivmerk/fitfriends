import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { FitnessUserService } from '../fitness-user/fitness-user.service.js';
import { TokenPayload } from '../../../types/token-payload.interface.js';
import jwtConfig from '../config/jwt.config.js';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh'
) {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly fitnessUserService: FitnessUserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: TokenPayload) {
    return this.fitnessUserService.getUser(payload.sub);
  }
}
