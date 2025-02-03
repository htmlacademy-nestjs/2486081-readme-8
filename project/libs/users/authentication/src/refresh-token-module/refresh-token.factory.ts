import { EntityFactory, JwtToken } from "@project/core";
import { RefreshTokenEntity } from "./refresh-token.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenFactory implements EntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: JwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData)
  }
}
