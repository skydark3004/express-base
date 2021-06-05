import * as express from 'express';
import {ErrorsConst} from './error.const';
import {StateModel} from '../common/model';

const stateJson: StateModel = require('../common/data/state.json');

/**
 * @method validationParamError
 * @description validate param in validator
 * @param {e.Response} res
 * @param errors
 * @return {Response}
 */
export function validationParamErrorBasic(res: express.Response, errors: any) {
  const messageTemp = Object.values<{ message: string }>(errors['errors']);
  return res.json({
    code: ErrorsConst.REQUEST_ERRORS[422].code,
    status: 422,
    message: messageTemp[0].message,
    error: errors['errors']
  });
}

export function validationParamError(res: express.Response, errors: any) {
  return res.bad({
    code: ErrorsConst.REQUEST_ERRORS[422].code,
    status: 422,
    message: Object.values<{ msg: string }>(errors)[0].msg,
    errors: errors
  });
}

export function validationState(value: string): boolean {
  return !!stateJson.state.find(stateItem => stateItem.abbreviation === value);
}

/**
 * @method validationSSN
 * @description validate ssn
 * @param {string} value
 * @return {boolean}
 */
export function validationSSN(value: string) {
  const blacklist = ['078051120', '219099999', '457555462'];
  const expression = /^(?!666|000|9\d{2})\d{3}[- ]{0,1}(?!00)\d{2}[- ]{0,1}(?!0{4})\d{4}$/;
  if (!expression.test(value)) {
    return false;
  }
  return blacklist.indexOf(value.replace(/\D/g, '')) === -1;
}

export function controllerTransformError(cb?: any) {
  return function (err: any) {
    console.error(`Controller catch info: `, err.message);
    if (cb) return cb(err);
  };
}

export function serviceTransformError(callback?: Function | { cb?: Function, service?: string }) {
  return function (err: any) {
    const serviceName = String((callback as any).service || 'Unknown').toUpperCase();
    console.error(`Service "${serviceName}" catch info: `, err.message);
    if (callback) return (callback as Function)(err);
    if ((callback as any).cb) return (callback as any).cb(err);
  };
}
