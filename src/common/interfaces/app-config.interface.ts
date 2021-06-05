import { AppEnvironment } from './app-environment.interface';

export interface AppConfigModel {
  ENV: AppEnvironment,
  NODE_ENV: string;
  ROOT: string;
  IS_PRODUCTION: boolean;
  IS_STAGING: boolean;
  IS_TESTING: boolean;
}
