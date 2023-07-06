import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';

export async function getJwtOptions(
  configService: ConfigService,
): Promise<JwtModuleOptions> {
  return {
    secret: configService.get<string>('jwt.accessTokenSecret'),
    signOptions: {
      expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
      algorithm: 'HS256',
    },
  };
}
