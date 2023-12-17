export interface IDecodedToken {
  iat: number;
  exp: number;
  id: string;
}

export interface ISessionUser extends Express.User {
  id: string;
  email: string;
  role: string;
}
