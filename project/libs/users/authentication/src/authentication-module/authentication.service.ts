import { ConflictException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { BlogUserEntity, BlogUserRepository } from "@project/blog-user";
import { CreateUserDto } from "../dto/create-user.dto";
import { AUTH_USER_EXISTS, AUTH_USER_NOT_FOUND, AUTH_USER_PASSWORD_WRONG } from "./authentication.constant";
import { LoginUserDto } from "../dto/login-user.dto";
import { dbConfig} from "@project/user-config"
import { ConfigType } from "@nestjs/config";

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly blogUserRepository: BlogUserRepository,

    @Inject(dbConfig.KEY)
    private readonly databaseConfig: ConfigType<typeof dbConfig>
  ) {}

  public async register(dto: CreateUserDto) {
    const { email, name, password} = dto;
    const blogUser = { email, name, urlAvatar: '', password: '' }
    const existUser = await this.blogUserRepository.findByEmail(email);

    if (existUser) {
      throw new ConflictException(AUTH_USER_EXISTS);
    }

    const userEntity = await new BlogUserEntity(blogUser).setPassword(password);
    this.blogUserRepository.save(userEntity);

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
    const existsUser = await this.blogUserRepository.findByID(id)

    if(! existsUser) {
      throw new Error;
    }

    return existsUser;
  }
}
