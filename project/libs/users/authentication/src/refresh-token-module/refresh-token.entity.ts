import { Entity, JwtToken, StorableEntity } from "@project/core";

export class RefreshTokenEntity extends Entity implements StorableEntity<JwtToken> {
  public tokenId: string;
  public createAt: Date;
  public userId: string;
  public expiresIn: Date;

  constructor(token?: JwtToken) {
    super();
    this.populate(token);
  }

  public populate(token?: JwtToken): void {
    if (! token ) {
      return;
    }
    this.id = token.id ?? '';
    this.createAt = token.createdAt;
    this.expiresIn = token.expiresIn;
    this.userId = token.userId;
    this.tokenId = token.tokenId
  }

  public toPOJO(): JwtToken {
    return {
      id: this.id,
      createdAt: this.createAt,
      expiresIn: this.expiresIn,
      userId: this.userId,
      tokenId: this.tokenId
    }
  }
}
