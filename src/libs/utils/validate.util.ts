import * as validator from 'validator';

export class ValidateUtil {
  public static isValidEmail(str: string): Boolean {
    if (!str || str.trim() === '') return false;
    return validator.default.isEmail(str);
  }

  public static isPhoneNumber(str: any): Boolean {
    if (!str || str.trim() === '') return false;
    return validator.default.isMobilePhone(str, 'vi-VN');
  }
}