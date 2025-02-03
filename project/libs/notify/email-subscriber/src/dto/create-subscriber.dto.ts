import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateSubscriberMessages } from '../email-subscriber.constant';

export class CreateSubscriberDto {
  @IsEmail({}, { message: CreateSubscriberMessages.Email })
  public email: string;

  @IsNotEmpty({ message: CreateSubscriberMessages.Name })
  public name: string;
}
