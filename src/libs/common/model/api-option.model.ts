import {Environment} from './common.model';

export interface ApiOptionModel {
  /**
   * @field allow_anonymous
   * @description allow connect api not secure
   */
  allow_anonymous?: boolean;

  /**
   * @field client_verify
   * @description client id verify
   */
  client_verify?: boolean;

  /**
   * @field secret_verify
   * @description secret key verify
   */
  secret_verify?: boolean;

  /**
   * @field roles
   * @description config roles access api
   */
  roles?: string | string[];

  /**
   * @field env
   * @description apply api execute for environment
   */
  env?: Environment[]
}
