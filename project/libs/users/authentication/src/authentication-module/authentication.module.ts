import { Module } from '@nestjs/common';
import { BlogUserModule } from '@project/blog-user'
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config';
import { getJwtOptions } from '@project/user-config';
import { NotifyUserModule } from '@project/notify-user';
import { JwtAccessStrategy } from '../strategies/jwt-access.strategy';
import { LocalStrategy } from '../strategies/local.strategy';
import { JwtRefreshStrategy } from '../strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token-module/refresh-token.module';
@Module({
  imports: [
    BlogUserModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: getJwtOptions,

    }),
    NotifyUserModule,
    RefreshTokenModule
  ],
  controllers: [ AuthenticationController],
  providers: [
    AuthenticationService,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
  ]
})
export class AuthenticationModule {}
