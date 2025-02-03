import { ConflictException, HttpException, HttpStatus, Inject, Injectable, Logger, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogUserEntity, BlogUserRepository } from "@project/blog-user";
import { CreateUserDto } from "../dto/create-user.dto";
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from "./authentication.constant";
import { LoginUserDto } from "../dto/login-user.dto";
import { User, Token} from "@project/core";
import { JwtService } from "@nestjs/jwt";
//import { refreshTokenConfig } from "@project/user-config";
import { ConfigType } from "@nestjs/config";
import { createJWTPayload } from '@project/helpers'
import { RefreshTokenService } from "../refresh-token-module/refresh-token.service";
import { jwtConfig } from "@project/user-config";


@Injectable()
export class AuthenticationService {
  private readonly logger = new Logger(AuthenticationService.name);

  constructor(
    private readonly blogUserRepository: BlogUserRepository,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY) private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenService: RefreshTokenService
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, name, password} = dto;
    const blogUser = { email, name, urlAvatar: '', password: ''}
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    await this.blogUserRepository.save(userEntity);

    return userEntity;
  }

  public async verifyUser(dto: LoginUserDto) {
    const { email, password} = dto
    const existsUser = await this.blogUserRepository.findByEmail(email);

    if(! existsUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND)
    }

    if(! await existsUser.comparePassword(password)) {
      throw new UnauthorizedException(AUTH_USER_PASSWORD_WRONG);
    }

    return existsUser;
  }

  public async findUserById(id: string) {
    const existsUser = await this.blogUserRepository.findById(id)

    if(! existsUser) {
      throw new Error;
    }

    return existsUser;
  }

  public async createUserToken(user: User): Promise<Token> {
    const accessTokenPayload = createJWTPayload(user);
    const refreshTokenPayload = { ... accessTokenPayload, tokenId: crypto.randomUUID() }
    await this.refreshTokenService.createRefreshSession(refreshTokenPayload)

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
        secret: this.jwtOptions.refreshTokenSecret,
        expiresIn: this.jwtOptions.refreshTokenExpiresIn
      })

      return { accessToken,  refreshToken}
    } catch (error) {
      this.logger.error('[Token generation error]: ' + error.message);
      throw new HttpException('Error when creating the token.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getUserByEmail(email: string) {
    const existsUser = await this.blogUserRepository.findByEmail(email)

    if (! existsUser ) {
      throw new NotFoundException(`User with email ${email} not found`)
    }

    return existsUser;
  }
}
