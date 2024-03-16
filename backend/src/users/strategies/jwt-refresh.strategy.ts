import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigType } from '@nestjs/config';
import { FitnessUserService } from '../fitness-user/fitness-user.service.js';
import jwtConfig from '../../config/jwt.config.js';
import { RefreshTokenService } from '../refresh-token/refresh-token.service.js';
import { TokenNotExistsException } from '../fitness-user/exception/token-not-exist.exception.js';
import { RefreshTokenPayload } from '../../types/refresh-token-payload.interface.js';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    @Inject(jwtConfig.KEY)
    jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly fitnessUserService: FitnessUserService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtOptions.refreshTokenSecret,
    });
  }

  public async validate(payload: RefreshTokenPayload) {
    if (!(await this.refreshTokenService.isExists(payload.tokenId))) {
      throw new TokenNotExistsException(payload.tokenId);
    }

    await this.refreshTokenService.deleteRefreshSession(payload.tokenId);
    await this.refreshTokenService.deleteExpiredRefreshTokens();
    return this.fitnessUserService.getUser(payload.sub);
  }
}
