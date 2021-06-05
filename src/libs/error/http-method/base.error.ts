
import { get } from 'lodash';
import { ErrorsConst } from '../error.const';

export class BaseError extends Error {
  constructor(options?: { error?: any, code?: string, status?: number, message?: string, name?: string, data?: any }) {
    // Calling parent constructor of base Error class.
    super();
    // set status
    const status = get(options, 'status') || 400;
    // Saving class name in the property of our custom error as a shortcut.
    this.name = options.name || ErrorsConst.REQUEST_ERRORS[status].name;
    this.message = get(options, 'error.message') || options.message || ErrorsConst.REQUEST_ERRORS[status].message;
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
    (this as any).code = get(options, 'code') || ErrorsConst.REQUEST_ERRORS[status].code;
    (this as any).inner = get(options, 'error');
    if (options.data) {
      (this as any).data = options.data;
    }
    (this as any).status = status;
  }
}
