import APP_CONFIG from '../configs/app.config';

export class ConfigLib {
  static API_RESTRICT: any = {
    CLIENT_SECRET: APP_CONFIG.ENV.API_RESTRICT.CLIENT_SECRET // global sync environment in container
  };

  static SECURE: any = {
    JWT: {
      TOKEN_EXPIRE: APP_CONFIG.ENV.SECURE.JWT.TOKEN_EXPIRE,
      JWT_SECRET: APP_CONFIG.ENV.SECURE.JWT.JWT_SECRET,
      FIELD: ['_id', 'role', 'email', 'display_name']
    }
  };
}
