/**
 * @module const library
 * @description define all const in library
 */

export class ConstLib {
  static readonly CLIENT_ID_INVALID: string = 'CLIENT_ID_INVALID';
  static readonly DEVICE_MOBILE: string = 'mobile';
  static readonly PatternLib = {
    name: /^\w+[A-Za-z\s\d]+$/,
    nameSpecial: /[~!@#$%^&*()-+=<>,?\/\\:;"']/,
    email: /^[_A-Za-z0-9-]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/,
    phone: /^(\+?84|0)(1[2689]|[89])[0-9]{8}$/,
    number: /^\d+$/
  };
  
}
