import * as jwt from 'jsonwebtoken';
import { set, pick, omitBy, isNil } from 'lodash';
import { Request, Response, NextFunction, RequestHandler } from 'express';

import { PermissionLib } from './permission.lib';
import { ExpressJwt as expressJwt } from './express-jwt';

import { Strategy } from '../common/model';
import { ForbiddenError } from '../error';
import { ConfigLib } from '../config.lib';

export default class AuthLib {

  static readonly JWT = {
    FIELD: ['_id', 'role', 'email', 'name']
  };

  /**
   * @method verifyToken
   * @description Check if token is valid
   * @param options
   * @return {e.RequestHandler}
   */
  public static verifyToken(options?: any): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      return expressJwt.handler(Object.assign({}, options, {
        secret: ConfigLib.SECURE.JWT.JWT_SECRET
      }))(req, res, next);
    };
  }

  /**
   * @method verifyTokenBase
   * @description sample verifyToken. But function not attach response failed when token not invalid
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   * @return {e.RequestHandler}
   */
  public static verifyTokenBase(req: Request, res: Response, next: NextFunction): void {
    const clientSecret: string = <string>req.headers[Strategy.ClientSecret];
    if (clientSecret && clientSecret.length >= 71 && ConfigLib.API_RESTRICT.CLIENT_SECRET.indexOf(clientSecret) > -1) {
      set(req, 'user', { role: PermissionLib.ADMIN_ROLES.ROOT });
      return next();
    }
    let token: string = <string>req.headers.authorization;
    jwt.verify(token ? token.substring(7) : '', ConfigLib.SECURE.JWT.JWT_SECRET,
      { algorithms: ['HS512'] }, function (err, decoded) {
        if (err) return next();
        req.user = decoded as any;
        return next();
      });
  }

  /**
   * @method decodeToken
   * @description decode token and attach token to user
   * @param {e.Request} req
   * @param {e.Response} res
   * @param {e.NextFunction} next
   */
  public static decodeToken(req: Request, res: Response, next: NextFunction): void {
    let token: string = <string>req.headers.authorization;
    if (token) {
      req.user = jwt.decode(token.substring(7)) as any;
    }
    next();
  }

  /**
   * @method verifyPermission
   * @description check role user
   * @param {string | string[]} roles
   * @return {e.RequestHandler}
   */
  public static verifyPermission(roles: string | string[]): RequestHandler {
    return function (req: Request, res: Response, next: NextFunction) {
      if (req.user && req.user.role === PermissionLib.ADMIN_ROLES.ROOT) return next();
      if ('string' === typeof roles) {
        roles = (roles as string).split(' ');
      }
      if (roles.indexOf(req.user.role) == -1) return res.bad(new ForbiddenError());
      next();
    };
  }

  /**
   * @method signToken
   * @description create new token
   * @param user
   * @param {string[]} fields
   * @param {number} expiresIn
   * @return {string}
   */
  public static signToken(
    user: any
    , fields: string[] = [...this.JWT.FIELD]
    , expiresIn: number = ConfigLib.SECURE.JWT.TOKEN_EXPIRE) {
    user = omitBy(user, isNil);
    return jwt.sign(
      pick(user, fields),
      ConfigLib.SECURE.JWT.JWT_SECRET,
      {
        algorithm: 'HS512',
        expiresIn: expiresIn
      }
    );
  }
}
