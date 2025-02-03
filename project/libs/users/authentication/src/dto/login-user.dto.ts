import { IsEmail, IsString } from "class-validator";
import { CreateLoginUserMessages } from "./login-user.messages";

export class LoginUserDto {
  @IsEmail({}, { message: CreateLoginUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateLoginUserMessages.password.invalidFormat})
  public password: string;
}
