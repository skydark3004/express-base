/// <reference types="express" />

declare namespace Express {
  export interface Request {
    user?: UserToken
  }

  export interface UserToken {
    _id: string;
    role: string;
    email: string;
    iat: number;
    exp: number;
  }

}
