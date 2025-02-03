import { AuthUser, Entity, StorableEntity } from '@project/core'
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public name: string;
  public urlAvatar: string;
  public password: string;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
     if (! user) {
      return
     }

    this.id = user.id ?? '';
    this.email = user.email;
    this.name = user.name;
    this.urlAvatar = user.urlAvatar ?? '';
    this.password= user.password;
  }

  public toPOJO(): AuthUser {
    return {
    id: this.id,
    email: this.email,
    name: this.name,
    urlAvatar: this.urlAvatar,
    password: this.password,
    }
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.password = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.password)
  }
}
