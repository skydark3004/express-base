export * from './app.const';
export * from './state.const';

import { Request } from 'express';
import { isEmpty } from 'lodash';
import * as Utils from '../../libs/utils';

let language: any = '';
export function setLanguage(req: Request) {
    language = Utils.StringUtil.removeAllSpecialCharacter(req.query.lang) || 'vi';
}
export function getLanguage() {
    return !isEmpty(language) ? language : 'vi';
}
export function removeLanguage() {
    language = '';
}