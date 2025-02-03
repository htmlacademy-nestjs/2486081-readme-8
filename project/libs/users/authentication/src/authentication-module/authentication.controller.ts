import { Controller, Post, Body, Param, Get, UseGuards, Req, HttpCode, HttpStatus,} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from '../dto/create-user.dto';
//import { LoginUserDto } from '../dto/login-user.dto';
import { NotifyUserService } from '@project/notify-user'
import { fillDto } from '@project/helpers';
import { LoggedUserRdo } from '../rto/logged-user.rdo';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { RequestWithUser } from './request-with-user.interface';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyUserService
  ) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name})
    return newUser.toPOJO();
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Req() { user }: RequestWithUser) {
    const userToken = await this.authService.createUserToken(user);
    return fillDto(LoggedUserRdo, { ... user.toPOJO(), ...userToken });
  }

  @Get(':id')
  public async show(@Param('id') id: string) {
    const user = await this.authService.findUserById(id);
    return user.toPOJO();
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user)
  }
}
