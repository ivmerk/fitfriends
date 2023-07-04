export interface Token {
  refreshTokenId?: number;
  tokenId: string;
  createdAt: Date;
  userId: string;
  expiresIn: Date;
}
