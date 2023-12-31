import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';
import { RefreshTokenEntity } from './refresh-token.entity';
import { RefreshToken } from '@prisma/client';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: RefreshTokenEntity): Promise<RefreshToken> {
    const entityData = item.toObject();
    return this.prisma.refreshToken.create({
      data: {
        ...entityData,
      },
    });
  }

  public async deleteByTokenId(tokenId: string) {
    return this.prisma.refreshToken.deleteMany({
      where: {
        tokenId,
      },
    });
  }

  public async findByTokenId(tokenId: string): Promise<RefreshToken | null> {
    return this.prisma.refreshToken.findFirst({
      where: {
        tokenId,
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
