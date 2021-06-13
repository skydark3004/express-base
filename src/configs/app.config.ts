import * as path from 'path';
import * as fs from 'fs';

import { AppEnvironment, AppConfigModel } from '../common/interfaces';


let ENV: AppEnvironment;
// config root
const ROOT = path.normalize(__dirname + '/..');

/**
 * @method setupEnv
 * @description config load environment
 * @return {AppEnvironment}
 */
function setupEnv(): AppEnvironment {
  // apply secret key
  let pathSecret: string = '/run/secrets/core-client-secret';
  if (!fs.existsSync(pathSecret)) {
    pathSecret = path.join(__dirname, '../../core-client-secret');
  }
  let pathJwtSecret: string = '/run/secrets/core-jwt-secret';
  if (!fs.existsSync(pathJwtSecret)) {
    pathJwtSecret = path.join(__dirname, '../../core-jwt-secret');
  }
  process.env.SYSTEM_SECRET_KEY = fs.readFileSync(pathSecret).toString().trim();
  process.env.SYSTEM_SECRET_JWT = fs.readFileSync(pathJwtSecret).toString().trim();
  return require('./environment.config').default;
}

ENV = setupEnv();
export default {
  ROOT: ROOT,
  ENV: ENV,
  NODE_ENV: process.env.NODE_ENV,
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_STAGING: process.env.NODE_ENV === 'staging',
  IS_DEVELOP: process.env.NODE_ENV === 'develop',
  IS_TESTING: process.env.NODE_ENV === 'test'
} as AppConfigModel;
