import { Expose } from "class-transformer";

export class LoggedUserRdo {
  @Expose({ name: '_id'})
  public id: string;

  @Expose({ name: 'name'})
  public name: string;

  @Expose()
  public email: string;

  @Expose()
  public accessToken: string;

  @Expose()
  public refreshToken: string
}
