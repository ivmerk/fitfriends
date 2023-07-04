import { Token } from '../../../types/token.interface';
import { PrismaService } from '../../prisma/prisma.service';
import { RefreshTokenEntity } from './refresh-token.entity';

export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RefreshTokenEntity): Promise<Token> {
    const entityData = item.toObject();
    return this.prisma.refreshToken.create({
      data: {
        ...entityData,
      },
    });
  }

  public async deleteByTokenId(refreshTokenId: number) {
    return this.prisma.refreshToken.delete({
      where: {
        refreshTokenId,
      },
    });
  }

  public async findByTokenId(refreshTokenId: number): Promise<Token | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        refreshTokenId,
      },
    });
  }

  public async deleteExpiredTokens() {
    return this.prisma.refreshToken.deleteMany({
      where: {
        expiresIn: { lt: new Date() },
      },
    });
  }
}
