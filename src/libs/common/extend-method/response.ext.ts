import * as express from 'express';
import * as chalk from 'chalk';

import { StringUtil } from '../../utils';
import { ErrorsConst } from '../../error/error.const';
import { ErrorResponse } from '../../common/model';

const exp: any = <any>express;

/**
 * @method ok
 * @description customer response success
 * @param data
 */
exp.response.ok = function (data?: any) {
  const _this: express.Response = this;
  if (_this.statusCode >= 400) throw new RangeError('Status code is not valid');
  _this.json(data);
};

/**
 * @method bad
 * @description customer response failed
 * @summary file attach is delete if response is failed
 * @param code
 * @param message
 * @param errors
 * @return {Response}
 */
exp.response.bad = function (code: any, message: any, errors: any) {
  const _this: express.Response = this;
  const status = (code ? code.status : undefined) || (_this.statusCode < 400 ? 400 : _this.statusCode);
  if (status < 400) throw new RangeError('Status code is not valid');
  if ('object' === typeof code) {
    if (ErrorsConst.SERVER_ERRORS.indexOf(code.name) > -1) {
      console.error(
        chalk.bgRed.white('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n',
          code.stack, '\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
      );
      return _this.status(500).json(mapError(code, _this));
    }
    return _this.status(status).json(mapError(code, _this));
  }
  return _this.status(status).json(mapError({ status, code, message, errors }, _this));
};

/**
 * @method maoError
 * @description map error data
 * @param error
 * @param _this -req, res global
 * @return {ErrorResponse}
 */
function mapError(error: any, _this: any): ErrorResponse {
  if (!error || 'object' !== typeof error) return undefined;
  let errors: any = {
    code: error.code,
    name: error.name || error.type || ErrorsConst.REQUEST_ERRORS[error.status || '400'].name,
    message: error.message || ErrorsConst.RESPONSE_ERRORS[error.code]
      || StringUtil.convertErrorCodeToMessage(error.code)
      || ErrorsConst.REQUEST_ERRORS[error.status || 400].message,
    errors: error.errors
  };
  if (error && error.data) {
    errors.data = error.data;
  }
  return errors;
}

export default 'Extend Express/Response';
