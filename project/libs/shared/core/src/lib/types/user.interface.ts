export interface User {
  id?: string;
  email: string;
  name: string;
  urlAvatar?: string;
}

export interface AuthUser extends User {
  password: string;
}
