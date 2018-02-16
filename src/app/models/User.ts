export namespace User {
  export interface IUser {
    email: string;
    password: string;
  }

  export interface ILogin {
    jwt: string;
    refresh_token: string;
  }
  export interface IMe {
    name: string;
    email: string;
    avatar_url: string;
  }
}
