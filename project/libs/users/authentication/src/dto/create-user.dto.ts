import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";
import { CreateUserMessages } from "./create-user.messages";

export class CreateUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message : CreateUserMessages.name.invalidFormat })
  @MinLength(1, { message: CreateUserMessages.name.minLength })
  @MaxLength(15, { message: CreateUserMessages.name.maxLength })
  public name: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
